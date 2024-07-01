import { IsString } from 'class-validator';

export class UpdateChatRoomBodyDto {
  @IsString()
  language: string;

  @IsString()
  categoryId: number;
}
