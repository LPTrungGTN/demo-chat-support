import { Injectable } from '@nestjs/common';
import { ChatRoom } from '@prisma/client';
import { Server } from 'socket.io';

import { getLanguageName } from '@/common/enums/language';
import { RoomStatus } from '@/common/enums/room-status';
import { ChatRoomRepository } from '@/modules/chat-room/chat-room.repository';
import { GptService } from '@/modules/gpt/gpt.service';
import { MessageRepository } from '@/modules/message/message.repository';
import { StaffRepository } from '@/modules/staff/staff.repository';
import { StaffStatusRepository } from '@/modules/staff-status/staff-status.repository';

@Injectable()
export class SocketService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly staffStatusRepository: StaffStatusRepository,
    private readonly messageRepository: MessageRepository,
    private readonly gptService: GptService,
    private readonly staffRepository: StaffRepository,
  ) {}

  public async sendMessage(
    message: string,
    chatRoomId: number,
    createdAt: string,
    io: Server,
    happinessId?: string,
    staffId?: string,
  ): Promise<void> {
    const newMessage = await this.messageRepository.create({
      chatRoomId: chatRoomId,
      content: message,
      happinessId,
      staffId,
    });

    io.to(chatRoomId.toString()).emit('newMessage', {
      chatRoomId,
      createdAt,
      message: {
        content: message,
        happinessId,
        id: newMessage.id,
        staffId,
      },
    });
  }

  public async handlerGptAnswer(
    chatRoom: ChatRoom,
    message: string,
    createdAt: string,
    io: Server,
    clientId: string,
  ) {
    let threadId = chatRoom.threadId;
    const roomId = chatRoom.id;
    if (!threadId) {
      threadId = await this.gptService.createThread();
      await this.chatRoomRepository.addThreadId(roomId, threadId);
    }

    const msgSendGpt = `anwser by ${getLanguageName(chatRoom.language)}: ${message}`;
    const gptAnwser = await this.gptService.getGptResponse(
      msgSendGpt,
      threadId,
    );
    const find = gptAnwser.search('0824444444');

    if (find === -1) {
      const gptMessage = await this.messageRepository.create({
        chatRoomId: roomId,
        content: gptAnwser,
        happinessId: null,
        staffId: null,
      });

      io.to(roomId.toString()).emit('newMessage', {
        createdAt,
        message: {
          content: gptAnwser,
          happinessId: null,
          id: gptMessage.id,
          staffId: null,
        },
        roomId,
      });
      return io.emit('updateContact');
    }

    const staff = await this.staffRepository.findActiveStaffByCategory(
      chatRoom.categoryId,
    );

    if (!staff || staff.staffCategories.length === 0 || !staff.staffStatus) {
      console.log('No staff available');
      return io.to(clientId).emit('error', {
        message: 'No staff available to join the chat room.',
      });
    }

    try {
      await Promise.all([
        this.chatRoomRepository.createChatRoomUser(staff.id, roomId),
        this.chatRoomRepository.updateStatus(roomId, RoomStatus.STAFF),
      ]);
    } catch (error) {
      console.log('Error in createChatRoomUser', error);
    }

    io.to(staff.staffStatus.clientId).emit('newCustomer', {
      chatRoomId: roomId,
      createdAt,
    });
    io.emit('updateContact');
  }

  public async sendMsgToStaff(
    chatRoom: ChatRoom,
    io: Server,
    clientId: string,
    createdAt: string,
  ) {
    const staff = await this.staffRepository.findActiveStaffByCategory(
      chatRoom.categoryId,
    );

    if (!staff || staff.staffCategories.length === 0 || !staff.staffStatus) {
      console.log('No staff available');
      return io.to(clientId).emit('error', {
        message: 'No staff available to join the chat room.',
      });
    }

    io.to(staff.staffStatus.clientId).emit('newCustomer', {
      chatRoomId: chatRoom.id,
      createdAt,
    });
    io.emit('updateContact');
  }
}
