import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ChatRoomService } from './chat-room.service';
import { ListChatRoomQueryDto } from './dto/list-chat-room-query.dto';

@Controller('chat_rooms')
export class ChatRoomController {
  constructor(private readonly service: ChatRoomService) {}

  @Get()
  public async index(
    @Query() query: ListChatRoomQueryDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { staffId } = query;
    const numericStaffId = staffId ? Number(staffId) : undefined;

    if (!numericStaffId && numericStaffId !== undefined) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'staffId is required',
      });
    }
    const rooms = await this.service.listAllByStaffId(numericStaffId);
    return res.status(HttpStatus.OK).json({ rooms });
  }
}
