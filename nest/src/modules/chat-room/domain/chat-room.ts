import { Message } from './message';

export class ChatRoom {
  constructor(
    private readonly chatRoomId: number,
    private readonly createdAt: string,
    private readonly language: string,
    private readonly categoryId: number,
    private readonly message?: Message,
  ) {}
}
