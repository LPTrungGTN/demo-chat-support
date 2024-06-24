import { Module } from '@nestjs/common';

import { ChatRoomController } from './chat-room.controller';
import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoomService } from './chat-room.service';

@Module({
  controllers: [ChatRoomController],
  exports: [ChatRoomRepository, ChatRoomService],
  providers: [ChatRoomRepository, ChatRoomService],
})
export class ChatRoomModule {}
