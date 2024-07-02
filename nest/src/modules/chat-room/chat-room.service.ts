import { Injectable } from '@nestjs/common';

import { RoleEnum } from '@/common/enums/role';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoom } from './domain/chat-room';
import { ListChatRoomQueryDto } from './dto/list-chat-room-query.dto';
import { UpdateChatRoomBodyDto } from './dto/update-chat-room-body.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    private readonly repository: ChatRoomRepository,
    private readonly prisma: PrismaService,
  ) {}

  public async listRoom(query: ListChatRoomQueryDto): Promise<ChatRoom[]> {
    const { id, role } = query;
    if (role === RoleEnum.USER) {
      return await this.repository.listByHappenessId(id);
    }

    return await this.repository.listAllByStaffId(id);
  }

  public async updateCategoryAndLanguage(
    body: UpdateChatRoomBodyDto,
    id: number,
  ) {
    const { categoryId, language } = body;
    await this.repository.updateCategoryAndLanguage(categoryId, language, id);
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
