import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get(':roomId')
  public async show(
    @Param('roomId') roomId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const numericRoomId = Number(roomId);
    if (isNaN(numericRoomId)) throw new BadRequestException();

    const messages = await this.service.listMsgByRoomId(numericRoomId);
    return res.status(HttpStatus.OK).json({ messages });
  }
}
