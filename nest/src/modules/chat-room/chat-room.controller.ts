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
    const rooms = await this.service.listAllByStaffId(query.staffId);
    return res.status(HttpStatus.OK).json({ rooms });
  }
}
