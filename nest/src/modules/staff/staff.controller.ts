import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginRequestDto } from './dto/login.request.dto';
import { StaffService } from './staff.service';

@Controller()
export class StaffController {
  constructor(private readonly service: StaffService) {}

  @Post('/login')
  public async login(
    @Body() request: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = await this.service.login(request);
    return res.status(HttpStatus.OK).json({ accessToken: userId });
  }

  @Post('/logout')
  public async logout(
    @Body('token') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.service.logout(token);
    return res.status(HttpStatus.OK).json();
  }
}
