import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Language } from '@/common/enums/language';
import { RoleEnum } from '@/common/enums/role';
import { StaffStatus } from '@/common/enums/staffStatus';
import { formatDateTime } from '@/common/util/date.utils';
import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { MessageRepository } from '@/modules/message/message.repository';
import { StaffRepository } from '@/modules/staff/staff.repository';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

@WebSocketGateway({ cors: true, namespace: '/chat', port: 3001 })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly staffRepository: StaffRepository,
    private readonly staffStatusRepository: StaffStatusRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  @WebSocketServer() io: Server;

  afterInit() {
    console.log('Initialized socket server');
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendMessage(message: string): void {
    this.io.emit('message', message);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { categoryId: number; happinessId: string; language: Language },
  ) {
    const { categoryId, happinessId, language } = data;
    if (!categoryId || !happinessId || !language) {
      return this.io.to(client.id).emit('error', {
        message: 'send missing data to create a chat room.',
      });
    }
    const chatRoom = await this.chatRoomRepository.create(data);
    const { id } = chatRoom;
    client.join(String(id));

    this.io.to(client.id).emit('roomCreated', {
      chatRoomId: id,
      createdAt: formatDateTime(),
      message: {
        content: '',
        staffId: RoleEnum.USER,
      },
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatRoomId: string; staffId: string },
  ) {
    const { chatRoomId } = data;
    const numericRoomId = Number(chatRoomId);
    const chatRoom = await this.chatRoomRepository.findById(numericRoomId);

    if (!chatRoom) {
      return this.io.to(client.id).emit('error', {
        message: 'Chat room not found or you do not have permission to join.',
      });
    }

    const rooms = Array.from(client.rooms);
    rooms.forEach((room) => {
      if (room !== client.id) {
        client.leave(room);
      }
    });

    client.join(chatRoomId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { chatRoomId: string; message: string; staffId?: string },
  ) {
    const createdAt = formatDateTime();
    const { chatRoomId, message, staffId } = data;
    let staff;
    const chatRoom = await this.chatRoomRepository.findById(Number(chatRoomId));

    console.log('chatRoomId', chatRoomId, message, staffId);
    if (message === 'staff' && staffId === RoleEnum.USER) {
      staff = await this.staffRepository.findActiveStaffByCategory(
        chatRoom.categoryId,
      );
      console.log('staff', staff);

      if (!staff || staff.staffCategories.length === 0 || !staff.staffStatus) {
        return this.io.to(client.id).emit('error', {
          message: 'No staff available to join the chat room.',
        });
      }

      await this.chatRoomRepository.createChatRoomUser(
        staff.id,
        Number(chatRoomId),
      );
    }

    const newMessage = {
      chatRoomId: Number(chatRoomId),
      content: message,
      happinessId: staffId === RoleEnum.USER ? staffId : null,
      staffId: staffId !== RoleEnum.USER ? staffId : null,
    };
    const result = await this.messageRepository.create(newMessage);
    this.io.to(staff.staffStatus.clientId).emit('newCustomer', {
      chatRoomId: chatRoomId,
      createdAt,
      message: {
        content: message,
        happinessId: staffId === RoleEnum.USER ? staffId : null,
        id: result.id,
        staffId: staffId !== RoleEnum.USER ? staffId : null,
      },
    });

    this.io.to(chatRoomId).emit('newMessage', {
      chatRoomId: Number(chatRoomId),
      createdAt,
      message: {
        content: message,
        happinessId: staffId === RoleEnum.USER ? staffId : null,
        id: result.id,
        staffId: staffId !== RoleEnum.USER ? staffId : null,
      },
    });

    this.io.emit('updateContact');
  }

  @SubscribeMessage('staffActive')
  async handleStaffActive(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { staffId: string },
  ) {
    try {
      await this.staffStatusRepository.upsert(
        data.staffId,
        StaffStatus.ACTIVE,
        client.id,
      );
    } catch (error) {
      this.io.to(client.id).emit('error', {
        message: 'Server error. Please try again later.',
      });
    }
  }
}
