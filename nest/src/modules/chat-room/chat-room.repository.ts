import { Injectable } from '@nestjs/common';
import { ChatRoom as ChatRoomPrisma } from '@prisma/client';

import { RoleEnum } from '@/common/enums/role';
import { formatDateTime } from '@/common/util/date.utils';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatRoom } from './domain/chat-room';
import { Message } from './domain/message';

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

  public async findById(id: number): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.findFirst({
      where: { id },
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

  public async listAllByStaffId(
    staffId: number | undefined,
  ): Promise<ChatRoom[]> {
    const chatRooms = await this.prisma.chatRoom.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          select: {
            content: true,
            createdAt: true,
            staffId: true,
          },
          take: 1,
        },
      },
      where: { staffId },
    });

    const sortedChatRooms = chatRooms.sort((a, b) => {
      const dateA = a.messages[0]?.createdAt || new Date(0);
      const dateB = b.messages[0]?.createdAt || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedChatRooms.map((chatRoom) => this.toDomain(chatRoom));
  }

  public toDomain(
    chatRoom: ChatRoomPrisma & {
      messages: { content: string; createdAt: Date; staffId: number }[];
    },
  ): ChatRoom {
    const { id, messages } = chatRoom;
    if (messages.length === 0)
      return new ChatRoom(id, new Message('', RoleEnum.USER), '');

    const { content, createdAt, staffId } = messages[0];
    return new ChatRoom(
      id,
      new Message(content ?? '', staffId ?? RoleEnum.USER),
      createdAt ? formatDateTime(createdAt) : '',
    );
  }
}
