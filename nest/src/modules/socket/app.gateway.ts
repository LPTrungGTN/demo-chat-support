import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Language } from '@/common/enums/language';
import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';

@WebSocketGateway({ cors: true, namespace: '/chat' })
export class AppGateway {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

  @WebSocketServer() server: Server;

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
    this.server.emit('message', message);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { categoryId: number; language: Language },
  ) {
    const chatRoom = await this.chatRoomRepository.create(data);
    const { id } = chatRoom;
    client.join(String(id));
    this.server.to(client.id).emit('roomCreated', { id });
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
      return this.server.to(client.id).emit('error', {
        message: 'Chat room not found or you do not have permission to join.',
      });
    }

    client.join(roomId);
    this.server.to(roomId).emit('staffJoined', { roomId, staffId });
    await this.chatRoomRepository.assignStaffToRoom(
      Number(staffId),
      Number(roomId),
    );
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; roomId: string },
  ) {
    this.server
      .to(data.roomId)
      .emit('newMessage', { message: data.message, sender: client.id });
  }
}
