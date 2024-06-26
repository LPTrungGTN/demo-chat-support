import { BadRequestException, Injectable } from '@nestjs/common';

import { RoleEnum } from '@/common/enums/role';

import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoom } from './domain/chat-room';

@Injectable()
export class ChatRoomService {
  constructor(private readonly repository: ChatRoomRepository) {}

  public async listAllByStaffId(staffId: string): Promise<ChatRoom[]> {
    const numericStaffId = this.parseStaffId(staffId);

    if (!numericStaffId && numericStaffId !== undefined) {
      throw new BadRequestException('staffId is required');
    }

    return await this.repository.listAllByStaffId(numericStaffId);
  }

  private parseStaffId(staffId: string | undefined): number | undefined {
    if (!staffId || staffId === RoleEnum.USER) {
      return undefined;
    }
    return Number(staffId);
  }
}
