import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomModule } from './modules/chat-room/chat-room.module';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SocketModule } from './modules/socket/socket.module';
import { StaffStatusModule } from './modules/staff-status/staff-status.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    PrismaModule,
    StaffStatusModule,
    SocketModule,
    ChatRoomModule,
    MessageModule,
  ],
  providers: [AppService],
})
export class AppModule {}
