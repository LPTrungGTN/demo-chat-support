export class Message {
  constructor(
    private readonly content: string,
    private readonly staffId: number | string,
    private readonly id: number,
  ) {}

  public get getStaffId(): number | string {
    return this.staffId;
  }

  public get getContent(): string {
    return this.content;
  }

  public get getId(): number {
    return this.id;
  }
}
