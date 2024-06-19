import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findStaff(username: string, password: string): Promise<Staff> {
    return this.prisma.staff.findFirst({
      where: {
        password,
        username,
      },
    });
  }
}
