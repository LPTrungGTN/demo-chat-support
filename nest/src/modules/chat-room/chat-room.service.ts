import { Injectable } from '@nestjs/common';

import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoom } from './domain/chat-room';

@Injectable()
export class ChatRoomService {
  constructor(private readonly repository: ChatRoomRepository) {}

  public async listAllByStaffId(
    staffId: number | undefined,
  ): Promise<ChatRoom[]> {
    return await this.repository.listAllByStaffId(staffId);
  }
}
