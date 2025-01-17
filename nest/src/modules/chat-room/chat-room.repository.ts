import { Injectable } from '@nestjs/common';
import { ChatRoom as ChatRoomPrisma } from '@prisma/client';

import { formatDateTime } from '@/common/util/date.utils';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatRoom } from './domain/chat-room';
import { Message } from './domain/message';

@Injectable()
export class ChatRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addThreadId(
    chatRoomId: number,
    threadId: string,
  ): Promise<void> {
    await this.prisma.chatRoom.update({
      data: {
        threadId,
      },
      where: {
        id: chatRoomId,
      },
    });
  }

  public async create(data: {
    happinessId: string;
    status: number;
  }): Promise<ChatRoomPrisma> {
    return await this.prisma.chatRoom.create({
      data,
    });
  }

  public async createChatRoomUser(
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
                happinessId: true,
                id: true,
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

  public async listByHappenessId(happinessId: string): Promise<ChatRoom[]> {
    const chatRooms = await this.prisma.chatRoom.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          select: {
            content: true,
            createdAt: true,
            happinessId: true,
            id: true,
            staffId: true,
          },
          take: 1,
        },
      },
      where: { happinessId },
    });

    const sortedChatRooms = chatRooms.sort((a, b) => {
      const dateA = a.messages[0]?.createdAt || new Date(0);
      const dateB = b.messages[0]?.createdAt || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedChatRooms.map((chatRoom) => this.toDomain(chatRoom));
  }

  public async updateStatus(status: number, id: number): Promise<void> {
    await this.prisma.chatRoom.update({
      data: {
        status,
      },
      where: { id },
    });
  }

  public async updateCategoryAndLanguage(
    categoryId: number,
    language: string,
    id: number,
  ): Promise<void> {
    await this.prisma.chatRoom.update({
      data: {
        categoryId,
        language,
      },
      where: { id },
    });
  }

  public toDomain(
    chatRoom: ChatRoomPrisma & {
      messages: {
        content: string;
        createdAt: Date;
        happinessId: string;
        id: number;
        staffId: string;
      }[];
    },
  ): ChatRoom {
    const { categoryId, id, language, messages } = chatRoom;
    if (messages.length === 0)
      return new ChatRoom(id, '', language, categoryId);

    const { content, createdAt, staffId } = messages[0];
    return new ChatRoom(
      id,
      createdAt ? formatDateTime(createdAt) : '',
      language,
      categoryId,
      new Message(
        content ?? '',
        staffId,
        messages[0].id,
        messages[0].happinessId,
      ),
    );
  }
}
