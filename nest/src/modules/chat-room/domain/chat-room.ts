import { Message } from './message';

export class ChatRoom {
  constructor(
    private readonly chatRoomId: number,
    private readonly message: Message,
    private readonly createdAt: string,
    private readonly language: string,
    private readonly categoryId: number | null,
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

  public get getLanguage(): string {
    return this.language;
  }

  public get getCategoryId(): number | null {
    return this.categoryId;
  }
}
