import { Injectable, UnauthorizedException } from '@nestjs/common';

import { StaffStatus } from '@/common/enums/staffStatus';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

import { LoginRequestDto } from './dto/login.request.dto';
import { StaffRepository } from './staff.repository';

@Injectable()
export class StaffService {
  constructor(
    private readonly repository: StaffRepository,
    private readonly staffStatusRepository: StaffStatusRepository,
  ) {}

  public async login(request: LoginRequestDto): Promise<number> {
    const { password, username } = request;

    const user = await this.repository.findStaff(password, username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    await this.staffStatusRepository.upsert(user.id, StaffStatus.ACTIVE);

    return user.id;
  }

  public async logout(token: string): Promise<void> {
    const user = await this.repository.findById(Number(token));

    if (!user) throw new UnauthorizedException('Invalid credentials');

    await this.staffStatusRepository.upsert(user.id, StaffStatus.INACTIVE);
  }
}
