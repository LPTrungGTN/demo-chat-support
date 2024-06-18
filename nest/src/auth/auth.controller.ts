import { Body, Controller, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async store(
    @Body() loginRequestDto: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).json({});
  }
}
