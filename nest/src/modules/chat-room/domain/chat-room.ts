export class ChatRoom {
  constructor(
    private readonly roomId: number,
    private readonly message: string,
    private readonly createdAt: string,
  ) {}

  public get getRoomId(): number {
    return this.roomId;
  }

  public get getMessage(): string {
    return this.message;
  }

  public get getCreateAt(): string {
    return this.createdAt;
  }
}
