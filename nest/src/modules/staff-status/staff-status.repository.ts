import { Injectable } from '@nestjs/common';
import { StaffStatus } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class StaffStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async upsert(staffId: number, status: number): Promise<StaffStatus> {
    return await this.prisma.staffStatus.upsert({
      create: {
        currentActiveChats: 0,
        maxActiveChats: 10,
        staffId,
        status,
      },
      update: {
        status,
      },
      where: {
        staffId,
      },
    });
  }
}
