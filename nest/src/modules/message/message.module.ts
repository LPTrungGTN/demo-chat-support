import { Module } from '@nestjs/common';

import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  exports: [MessageRepository, MessageService],
  providers: [MessageRepository, MessageService],
})
export class MessageModule {}
