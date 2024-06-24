import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get(':roomId')
  public async store(
    @Param('roomId') roomId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const messages = await this.service.listMsgByRoomId(Number(roomId));
    return res.status(HttpStatus.OK).json({ messages });
  }
}
