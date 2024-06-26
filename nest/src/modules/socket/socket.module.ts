import { Module } from '@nestjs/common';

import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { MessageRepository } from '@/modules/message/message.repository';
import { StaffRepository } from '@/modules/staff/staff.repository';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { AppGateway } from './app.gateway';

@Module({
  exports: [AppGateway],
  providers: [
    AppGateway,
    ChatRoomRepository,
    StaffRepository,
    StaffStatusRepository,
    MessageRepository,
  ],
})
export class SocketModule {}
