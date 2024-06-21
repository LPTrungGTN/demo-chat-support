import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: {
    chatRoomId: number;
    content: string;
    staffId?: number | null;
  }): Promise<Message> {
    return await this.prisma.message.create({
      data,
    });
  }

  public async listByChatRoomId(chatRoomId: number) {
    return await this.prisma.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        content: true,
        createdAt: true,
        staffId: true,
      },
      where: {
        chatRoomId,
      },
    });
  }
}
