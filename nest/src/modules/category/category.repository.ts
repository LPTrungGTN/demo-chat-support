import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }
}
