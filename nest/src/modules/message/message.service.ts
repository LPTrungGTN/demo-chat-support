import { Injectable } from '@nestjs/common';

import { Message } from '@/modules/chat-room/domain/message';

import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  public async listMsgByChatRoomId(chatRoomId: number): Promise<Message[]> {
    return await this.repository.listByChatRoomId(chatRoomId);
  }
}
