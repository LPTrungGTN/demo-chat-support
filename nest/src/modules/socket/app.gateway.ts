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

import { RoomStatus } from '@/common/enums/room-status';
import { StaffStatus } from '@/common/enums/staffStatus';
import { formatDateTime } from '@/common/util/date.utils';
import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true, namespace: '/chat', port: 3001 })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly staffStatusRepository: StaffStatusRepository,

    private readonly service: SocketService,
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
    data: { happinessId: string },
  ) {
    const { happinessId } = data;
    if (!happinessId) {
      return this.io.to(client.id).emit('error', {
        message: 'send missing data to create a chat room.',
      });
    }
    const chatRoom = await this.chatRoomRepository.create({
      happinessId,
      status: RoomStatus.Waiting,
    });
    const { id } = chatRoom;
    client.join(String(id));

    this.io.to(client.id).emit('roomCreated', {
      chatRoomId: id,
      createdAt: formatDateTime(),
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

  @SubscribeMessage('userSendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { chatRoomId: string; happinessId: string; message: string },
  ) {
    const createdAt = formatDateTime();
    const { chatRoomId, happinessId, message } = data;
    const numericRoomId = Number(chatRoomId);

    await this.service.sendMessage(
      message,
      chatRoomId,
      createdAt,
      this.io,
      happinessId,
    );

    const chatRoom = await this.chatRoomRepository.findById(numericRoomId);

    switch (chatRoom.status) {
      case RoomStatus.Waiting:
        this.io.to(client.id).emit('waiting');
        break;
      case RoomStatus.GPT:
        await this.service.handlerGptAnswer(
          chatRoom,
          message,
          createdAt,
          chatRoomId,
          this.io,
          client.id,
        );
        break;
      case RoomStatus.STAFF:
        await this.service.sendMsgToStaff(
          chatRoom,
          this.io,
          client.id,
          chatRoomId,
          createdAt,
        );
        break;
    }
  }

  @SubscribeMessage('staffSendMsg')
  async handleStaffSendMsg(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { chatRoomId: string; message: string; staffId: string },
  ) {
    const createdAt = formatDateTime();
    const { chatRoomId, message, staffId } = data;

    await this.service.sendMessage(
      message,
      chatRoomId,
      createdAt,
      this.io,
      null,
      staffId,
    );
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
      console.log('Error in handleStaffActive', error);
      this.io.to(client.id).emit('error', {
        message: 'Server error. Please try again later.',
      });
    }
  }
}
