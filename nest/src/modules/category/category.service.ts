import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  public async list(): Promise<Category[]> {
    return this.repository.listAll();
  }
}
