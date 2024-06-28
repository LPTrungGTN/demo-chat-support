import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoom } from './domain/chat-room';

@Injectable()
export class ChatRoomService {
  constructor(
    private readonly repository: ChatRoomRepository,
    private readonly prisma: PrismaService,
  ) {}

  public async listRoom(id: string): Promise<ChatRoom[]> {
    let rooms = await this.repository.listAllByStaffId(id);
    if (rooms.length === 0) {
      rooms = await this.repository.listByHappenessId(id);
    }
    return rooms;
  }

  public async seed(): Promise<void> {
    for (let i = 0; i < 4; i++) {
      const staff = await this.prisma.staff.create({
        data: {
          password: 'password' + i,
          username: 'staff' + i,
        },
      });

      await this.prisma.staffStatus.create({
        data: {
          staffId: staff.id,
        },
      });

      const category = await this.prisma.category.create({
        data: {
          description: 'Description ' + i,
          name: 'Category ' + i,
        },
      });

      await this.prisma.staffCategory.create({
        data: {
          categoryId: category.id,
          staffId: staff.id,
        },
      });
    }
  }
}
