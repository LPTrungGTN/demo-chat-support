import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ChatRoomService } from './chat-room.service';
import { ListChatRoomQueryDto } from './dto/list-chat-room-query.dto';
import { UpdateChatRoomBodyDto } from './dto/update-chat-room-body.dto';

@Controller('chat_rooms')
export class ChatRoomController {
  constructor(private readonly service: ChatRoomService) {}

  @Get()
  public async index(
    @Query() query: ListChatRoomQueryDto,
    @Res() res: Response,
  ): Promise<Response> {
    const rooms = await this.service.listRoom(query);

    return res.status(HttpStatus.OK).json({ rooms });
  }

  @Put(':id')
  public async updateCategoryAndLanguage(
    @Param('id') id: number,
    @Body() body: UpdateChatRoomBodyDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.service.updateCategoryAndLanguage(body, Number(id));

    return res.status(HttpStatus.OK).json({ message: 'Updated' });
  }

  @Get('seed')
  public async seed(@Res() res: Response): Promise<Response> {
    await this.service.seed();
    return res.status(HttpStatus.OK).json({ message: 'Seeded' });
  }
}
