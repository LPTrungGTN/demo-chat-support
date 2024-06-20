import { Module } from '@nestjs/common';

import { ChatRoomRepository } from './chat-room.repository';

@Module({
  exports: [ChatRoomRepository],
  providers: [ChatRoomRepository],
})
export class ChatRoomModule {}
