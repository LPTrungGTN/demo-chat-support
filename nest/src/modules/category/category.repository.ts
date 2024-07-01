import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async listAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
