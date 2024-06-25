import { IsOptional, IsString } from 'class-validator';

export class ListChatRoomQueryDto {
  @IsOptional()
  @IsString()
  staffId?: string;
}
