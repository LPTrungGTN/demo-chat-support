import { Module } from '@nestjs/common';

import { StaffStatusRepository } from './staff-status.repository';
import { StaffStatusService } from './staff-status.service';

@Module({
  exports: [StaffStatusService, StaffStatusRepository],
  providers: [StaffStatusService, StaffStatusRepository],
})
export class StaffStatusModule {}
