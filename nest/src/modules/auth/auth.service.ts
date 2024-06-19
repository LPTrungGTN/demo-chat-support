import { BadRequestException, Injectable } from '@nestjs/common';

import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { AuthRepository } from './auth.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly staffStatusRepository: StaffStatusRepository,
  ) {}
  active = 1;

  public async login(request: LoginRequestDto): Promise<number> {
    const { password, username } = request;
    const user = await this.repository.findStaff(username, password);

    if (!user) throw new BadRequestException('Invalid credentials');

    await this.staffStatusRepository.upsert(user.id, this.active);

    return user.id;
  }
}
