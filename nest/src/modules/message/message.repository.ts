import { Injectable } from '@nestjs/common';
import { Message as MessagePrisma } from '@prisma/client';

import { Message } from '@/modules/chat-room/domain/message';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: {
    chatRoomId: number;
    content: string;
    happinessId?: string | null;
    staffId?: string | null;
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
        happinessId: true,
        id: true,
        staffId: true,
      },
      where: {
        chatRoomId,
      },
    });

    return data.map(this.toDomain);
  }

  private toDomain(message: MessagePrisma): Message {
    const { content, happinessId, id, staffId } = message;
    return new Message(content, staffId, id, happinessId);
  }
}
