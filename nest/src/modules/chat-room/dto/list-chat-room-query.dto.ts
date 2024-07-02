import { IsString } from 'class-validator';

export class ListChatRoomQueryDto {
  @IsString()
  id: string;

  @IsString()
  role: string;
}
