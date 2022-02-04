import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  async postChat(
    roomId: string,
    senderId: bigint,
    sentTime: string,
    content: string,
  ) {
    const logger = new Logger('ChatService');
    const chatLog = new ChattingHistory();
    chatLog.roomId = roomId;
    chatLog.senderId = senderId;
    chatLog.content = content;
    chatLog.sentTime = sentTime;
    const savedChat = await this.chattingHistoryRepository.save(chatLog);
    if (!savedChat) {
      throw new BadGatewayException('채팅 저장에 실패했습니다.');
    }

    this.eventsGateway.server.to(`/${roomId}`).emit('message', savedChat);
  }
}
