import { Module } from '@nestjs/common';

import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, StaffStatusRepository],
})
export class AuthModule {}
