import { Injectable, UnauthorizedException } from '@nestjs/common';

import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { AuthRepository } from './auth.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  private readonly ACTIVE_STATUS = 1;
  private readonly INACTIVE_STATUS = 0;

  constructor(
    private readonly repository: AuthRepository,
    private readonly staffStatusRepository: StaffStatusRepository,
  ) {}

  public async login(request: LoginRequestDto): Promise<number> {
    const { password, username } = request;

    const user = await this.repository.findStaff(password, username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    await this.staffStatusRepository.upsert(user.id, this.ACTIVE_STATUS);

    return user.id;
  }

  public async logout(token: string): Promise<void> {
    const user = await this.repository.findById(Number(token));

    if (!user) throw new UnauthorizedException('Invalid credentials');

    await this.staffStatusRepository.upsert(user.id, this.INACTIVE_STATUS);
  }
}
