import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChattingHistory } from '../entities/ChattingHistory';
import { Repository } from 'typeorm';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChattingHistory)
    private chattingHistoryRepository: Repository<ChattingHistory>,
    private eventsGateway: EventsGateway,
  ) {}

  async postChat({ roomId, senderId, sentTime, content }) {
    const chatLog = new ChattingHistory();
    chatLog.roomId = roomId;
    chatLog.senderId = senderId;
    chatLog.content = content;
    chatLog.sentTime = sentTime;

    const savedChat = await this.chattingHistoryRepository.save(chatLog);
    if (!savedChat) {
      throw new NotFoundException('저장에 실패하였습니다.');
    }

    // const arr = roomId.split('-', 2);
    // if (senderId !== parseInt(arr[0])) {
    //   const receiverId = parseInt(arr[0]);
    // } else {
    //   const receiverId = parseInt(arr[1]);
    // }
    this.eventsGateway.server.to(`/${roomId}`).emit('message', savedChat);
  }
}
