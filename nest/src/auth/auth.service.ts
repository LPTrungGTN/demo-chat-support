import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthRepository } from './auth.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  public async login(request: LoginRequestDto): Promise<number> {
    const { password, username } = request;
    const user = await this.repository.findByUsernameAndPassword(
      username,
      password,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return user.id;
  }
}
