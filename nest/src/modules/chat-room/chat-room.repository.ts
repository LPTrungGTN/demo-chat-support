import { Injectable } from '@nestjs/common';
import { ChatRoom as ChatRoomPrisma } from '@prisma/client';

import { formatDateTime } from '@/common/util/date.utils';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatRoom } from './domain/chat-room';

@Injectable()
export class ChatRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: {
    categoryId: number;
    language: string;
  }): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.create({
      data,
    });
  }

  public async findAvailableRoomById(id: number): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.findFirst({
      where: { id, staffId: null },
    });
  }

  public async assignStaffToRoom(
    staffId: number,
    id: number,
  ): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.update({
      data: { staffId },
      where: { id },
    });
  }

  public async listAllByStaffId(staffId: number | null): Promise<ChatRoom[]> {
    const chatRooms = await this.prisma.chatRoom.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          select: {
            content: true,
            createdAt: true,
          },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'asc' },
      where: { staffId },
    });

    return chatRooms.map((chatRoom) => this.toDomain(chatRoom));
  }

  public toDomain(
    chatRoom: ChatRoomPrisma & {
      messages: { content: string; createdAt: Date }[];
    },
  ): ChatRoom {
    const { id, messages } = chatRoom;
    if (messages.length === 0) return new ChatRoom(id, '', '');

    const { content, createdAt } = messages[0];
    return new ChatRoom(
      id,
      content ?? '',
      createdAt ? formatDateTime(createdAt) : '',
    );
  }
}
