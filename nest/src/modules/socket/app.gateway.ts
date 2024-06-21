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
import { StaffStatus } from '@/common/enums/staffStatus';
import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
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
    @MessageBody() data: { categoryId: number; language: Language },
  ) {
    const chatRoom = await this.chatRoomRepository.create(data);
    const { id } = chatRoom;
    client.join(String(id));
    this.io.to(client.id).emit('roomCreated', { id });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; staffId: string },
  ) {
    const { roomId, staffId } = data;
    const chatRoom = await this.chatRoomRepository.findAvailableRoomById(
      Number(roomId),
    );

    if (!chatRoom) {
      return this.io.to(client.id).emit('error', {
        message: 'Chat room not found or you do not have permission to join.',
      });
    }

    client.join(roomId);
    this.io.to(roomId).emit('staffJoined', { roomId, staffId });
    await this.chatRoomRepository.assignStaffToRoom(
      Number(staffId),
      Number(roomId),
    );
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; roomId: string },
  ) {
    const timestamp = new Date().toISOString();
    const { message, roomId } = data;
    if (message === 'staff') {
      const chatRoom = await this.chatRoomRepository.findAvailableRoomById(
        Number(roomId),
      );

      if (!chatRoom) {
        return this.io.to(client.id).emit('error', {
          message: 'Chat room not found or you do not have permission to join.',
        });
      }

      const staff = await this.staffRepository.findActiveStaffByCategory(
        chatRoom.categoryId,
      );

      if (!staff || staff.staffCategorys.length === 0 || !staff.staffStatus) {
        return this.io.to(client.id).emit('error', {
          message: 'No staff available to join the chat room.',
        });
      }

      await this.chatRoomRepository.assignStaffToRoom(staff.id, chatRoom.id);
      this.io.to(staff.staffStatus.clientId).emit('newCustomer', {
        message: message,
        roomId: chatRoom.id,
        status: true,
        timestamp,
      });
    }
    console.log('start send msg comeback');

    this.io.to(roomId).emit('newMessage', {
      message: message,
      sender: client.id,
      timestamp,
    });
  }

  @SubscribeMessage('staffActive')
  async handleStaffActive(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { staffId: string },
  ) {
    try {
      await this.staffStatusRepository.upsert(
        Number(data.staffId),
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
