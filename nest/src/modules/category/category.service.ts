import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  public async categories() {
    return await this.repository.findAll();
  }
}
