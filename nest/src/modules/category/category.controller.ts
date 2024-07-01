import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  public async login(@Res() res: Response): Promise<Response> {
    const categories = await this.service.list();
    return res.status(HttpStatus.OK).json({ categories });
  }
}
