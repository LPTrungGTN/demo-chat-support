import { Injectable } from '@nestjs/common';
import { Staff, StaffCategory, StaffStatus } from '@prisma/client';

import { StaffStatus as StaffStatusEnum } from '@/common/enums/staffStatus';
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

  public async findActiveStaffByCategory(categoryId: number): Promise<
    Staff & {
      staffCategorys: StaffCategory[];
      staffStatus?: StaffStatus;
    }
  > {
    return this.prisma.staff.findFirst({
      include: {
        staffCategorys: {
          where: {
            categoryId: categoryId,
          },
        },
        staffStatus: true,
      },
      where: {
        staffCategorys: {
          some: {
            categoryId,
          },
        },
        staffStatus: {
          currentActiveChats: {
            lt: this.prisma.staffStatus.fields.maxActiveChats,
          },

          status: StaffStatusEnum.ACTIVE,
        },
      },
    });
  }
}
