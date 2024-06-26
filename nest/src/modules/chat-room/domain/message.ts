export class Message {
  constructor(
    private readonly content: string,
    private readonly staffId: number | string,
  ) {}

  public get getStaffId(): number | string {
    return this.staffId;
  }

  public get getContent(): string {
    return this.content;
  }
}
