import { Injectable } from '@nestjs/common';
import { Message as MessagePrisma } from '@prisma/client';

import { RoleEnum } from '@/common/enums/role';
import { Message } from '@/modules/chat-room/domain/message';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: {
    chatRoomId: number;
    content: string;
    staffId?: number | null;
  }): Promise<MessagePrisma> {
    return await this.prisma.message.create({
      data,
    });
  }

  public async listByChatRoomId(chatRoomId: number): Promise<Message[]> {
    const data = await this.prisma.message.findMany({
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

    return data.map(this.toDomain);
  }

  private toDomain(message: MessagePrisma): Message {
    return new Message(message.content, message.staffId ?? RoleEnum.USER);
  }
}
