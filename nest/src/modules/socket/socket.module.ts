import { Module } from '@nestjs/common';

import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';

import { AppGateway } from './app.gateway';

@Module({
  exports: [AppGateway],
  providers: [AppGateway, ChatRoomRepository],
})
export class SocketModule {}
