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
    happinessId: string;
    language: string;
  }): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.create({
      data,
    });
  }

  public async findAvailableRoomById(id: number): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.findFirst({
      include: {
        chatRoomUsers: true,
      },
      where: {
        chatRoomUsers: {
          some: {
            staffId: null,
          },
        },
        id,
      },
    });
  }

  public async findById(id: number): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.findFirst({
      where: { id },
    });
  }

  public async assignStaffToRoom(
    staffId: string,
    chatRoomId: number,
  ): Promise<void> {
    await this.prisma.chatRoomUser.create({
      data: {
        chatRoomId,
        staffId,
      },
    });
  }

  public async listAllByStaffId(staffId: string): Promise<ChatRoom[]> {
    const chatRoomUsers = await this.prisma.chatRoomUser.findMany({
      include: {
        chatRooms: {
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
        },
      },
      where: { staffId },
    });

    const sortedChatRooms = chatRoomUsers.sort((a, b) => {
      const dateA = a.chatRooms.messages[0]?.createdAt || new Date(0);
      const dateB = b.chatRooms.messages[0]?.createdAt || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedChatRooms.map((chatRoomUser) =>
      this.toDomain(chatRoomUser.chatRooms),
    );
  }

  public toDomain(
    chatRoom: ChatRoomPrisma & {
      messages: { content: string; createdAt: Date; staffId: string }[];
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
