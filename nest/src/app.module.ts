import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, PrismaModule],
  providers: [AppService],
})
export class AppModule {}
