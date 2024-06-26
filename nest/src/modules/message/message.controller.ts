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

  @Get(':chatRoomId')
  public async show(
    @Param('chatRoomId') chatRoomId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const numericChatRoomId = Number(chatRoomId.trim());
    if (isNaN(numericChatRoomId)) throw new BadRequestException();

    const messages = await this.service.listMsgByChatRoomId(numericChatRoomId);
    return res.status(HttpStatus.OK).json({ messages });
  }
}
