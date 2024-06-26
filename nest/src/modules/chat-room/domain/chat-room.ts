import { Message } from './message';

export class ChatRoom {
  constructor(
    private readonly chatRoomId: number,
    private readonly message: Message,
    private readonly createdAt: string,
  ) {}

  public get getChatRoomId(): number {
    return this.chatRoomId;
  }

  public get getMessage(): Message {
    return this.message;
  }

  public get getCreateAt(): string {
    return this.createdAt;
  }
}
