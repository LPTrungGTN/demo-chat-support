import { Module } from '@nestjs/common';

import { MessageRepository } from './message.repository';

@Module({
  exports: [MessageRepository],
  providers: [MessageRepository],
})
export class MessageModule {}
