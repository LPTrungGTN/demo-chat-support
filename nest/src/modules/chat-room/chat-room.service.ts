import { Injectable } from '@nestjs/common';

import { ChatRoomRepository } from './chat-room.repository';

@Injectable()
export class ChatRoomService {
  constructor(private readonly repository: ChatRoomRepository) {}

  public async listAllByStaffId(staffId: number | null) {
    return await this.repository.listAllByStaffId(staffId);
  }
}
