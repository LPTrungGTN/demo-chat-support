import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { ChatRoomModule } from './modules/chat-room/chat-room.module';
import { GptModule } from './modules/gpt/gpt.module';
import { MessageModule } from './modules/message/message.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SocketModule } from './modules/socket/socket.module';
import { StaffModule } from './modules/staff/staff.module';
import { StaffStatusModule } from './modules/staff-status/staff-status.module';

@Module({
  controllers: [AppController],
  imports: [
    StaffModule,
    PrismaModule,
    StaffStatusModule,
    SocketModule,
    ChatRoomModule,
    MessageModule,
    GptModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CategoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
