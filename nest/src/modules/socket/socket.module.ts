import { Module } from '@nestjs/common';

import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { GptService } from '@/modules/gpt/gpt.service';
import { MessageRepository } from '@/modules/message/message.repository';
import { StaffRepository } from '@/modules/staff/staff.repository';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { AppGateway } from './app.gateway';
import { SocketService } from './socket.service';

@Module({
  exports: [AppGateway],
  providers: [
    AppGateway,
    ChatRoomRepository,
    StaffRepository,
    StaffStatusRepository,
    MessageRepository,
    GptService,
    SocketService,
  ],
})
export class SocketModule {}
