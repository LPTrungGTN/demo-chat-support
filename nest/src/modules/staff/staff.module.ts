import { Module } from '@nestjs/common';

import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';
import { StaffService } from './staff.service';

@Module({
  controllers: [StaffController],
  providers: [StaffService, StaffRepository, StaffStatusRepository],
})
export class StaffModule {}
