import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { StaffStatusModule } from './modules/staff-status/staff-status.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, PrismaModule, StaffStatusModule],
  providers: [AppService],
})
export class AppModule {}
