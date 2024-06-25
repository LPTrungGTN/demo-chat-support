import { Message } from './message';

export class ChatRoom {
  constructor(
    private readonly roomId: number,
    private readonly message: Message,
    private readonly createdAt: string,
  ) {}

  public get getRoomId(): number {
    return this.roomId;
  }

  public get getMessage(): Message {
    return this.message;
  }

  public get getCreateAt(): string {
    return this.createdAt;
  }
}
