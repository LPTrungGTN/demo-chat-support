import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Staff> {
    return this.prisma.staff.findFirst({
      where: {
        password,
        username,
      },
    });
  }
}
