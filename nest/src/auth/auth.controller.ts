import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  public async store(
    @Body() request: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = await this.service.login(request);
    return res.status(HttpStatus.OK).json({ accessToken: userId });
  }
}
