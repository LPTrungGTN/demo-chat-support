import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class StaffRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findStaff(password: string, username: string): Promise<Staff> {
    return this.prisma.staff.findFirst({
      where: {
        password,
        username,
      },
    });
  }

  public async findById(id: number): Promise<Staff> {
    return this.prisma.staff.findFirst({
      where: {
        id,
      },
    });
  }
}
