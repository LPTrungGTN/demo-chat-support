export class Message {
  constructor(
    private readonly content: string,
    private readonly staffId: string,
    private readonly id: number,
    private readonly happinessId: string,
  ) {}

  public get getStaffId(): string {
    return this.staffId;
  }

  public get getContent(): string {
    return this.content;
  }

  public get getId(): number {
    return this.id;
  }

  public get getHappinessId(): string {
    return this.happinessId;
  }
}
