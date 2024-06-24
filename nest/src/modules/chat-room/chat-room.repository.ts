import { Injectable } from '@nestjs/common';
import { ChatRoom } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ChatRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: {
    categoryId: number;
    language: string;
  }): Promise<ChatRoom> {
    return await this.prisma.chatRoom.create({
      data,
    });
  }

  public async findAvailableRoomById(id: number): Promise<ChatRoom> {
    return await this.prisma.chatRoom.findFirst({
      where: { id, staffId: null },
    });
  }

  public async assignStaffToRoom(
    staffId: number,
    id: number,
  ): Promise<ChatRoom> {
    return await this.prisma.chatRoom.update({
      data: { staffId },
      where: { id },
    });
  }

  public async listAllByStaffId(staffId: number | null): Promise<ChatRoom[]> {
    return await this.prisma.chatRoom.findMany({
      where: { staffId },
    });
  }
}
