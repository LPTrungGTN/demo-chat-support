import { Module } from '@nestjs/common';

import { GptService } from './gpt.service';

@Module({
  exports: [GptService],
  providers: [GptService],
})
export class GptModule {}
