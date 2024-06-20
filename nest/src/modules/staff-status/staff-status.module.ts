import { Module } from '@nestjs/common';

import { StaffStatusRepository } from './staff-status.repository';

@Module({
  exports: [StaffStatusRepository],
  providers: [StaffStatusRepository],
})
export class StaffStatusModule {}
