import { Injectable } from '@nestjs/common';

import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  public async listMsgByRoomId(roomId: number) {
    return await this.repository.listByChatRoomId(roomId);
  }
}
