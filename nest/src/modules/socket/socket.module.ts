import { Module } from '@nestjs/common';

import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { StaffRepository } from '@/modules/staff/staff.repository';

import { AppGateway } from './app.gateway';

@Module({
  exports: [AppGateway],
  providers: [AppGateway, ChatRoomRepository, StaffRepository],
})
export class SocketModule {}
