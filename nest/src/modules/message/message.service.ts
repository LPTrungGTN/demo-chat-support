import { Injectable } from '@nestjs/common';

import { Message } from '@/modules/chat-room/domain/message';

import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  public async listMsgByRoomId(roomId: number): Promise<Message[]> {
    return await this.repository.listByChatRoomId(roomId);
  }
}
