import { IsNumber, IsString } from 'class-validator';

export class UpdateChatRoomBodyDto {
  @IsString()
  language: string;

  @IsNumber()
  categoryId: number;
}
