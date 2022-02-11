import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChattingHistory } from '../entities/ChattingHistory';
import { Repository } from 'typeorm';
import { EventsGateway } from '../events/events.gateway';
import { MessageDto } from './dto/message.dto';
import { onlineMap } from '../events/onlineMap';

// function getKeyByValue(object, value) {
//   return Object.keys(object).find((key) => object[key] === value);
// }

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChattingHistory)
    private chattingHistoryRepository: Repository<ChattingHistory>,
    private eventsGateway: EventsGateway,
  ) {}

  async postChat(
    id: bigint,
    roomId: string,
    senderId: bigint,
    sentTime: string,
    content: string,
    userName: string,
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

    const latestChat = await this.chattingHistoryRepository
      .createQueryBuilder('c')
      .where('c.roomId=:roomId', { roomId })
      .andWhere('c.senderId=:senderId', { senderId })
      .orderBy('c.id', 'DESC')
      .getOne();

    const latestId: bigint = latestChat.id;

    const message = new MessageDto();
    message.id = latestId;
    message.roomId = roomId;
    message.userName = userName;
    message.content = content;
    message.senderId = senderId;
    message.sentTime = sentTime;

    const a: string[] = roomId.split('-');
    let ReceiverId: bigint;
    if (BigInt(a[0]) === senderId) {
      ReceiverId = BigInt(a[1]);
    } else {
      ReceiverId = BigInt(a[0]);
    }

    // const receiverSocketId = getKeyByValue(
    //   onlineMap[`/dm-${roomId}`],
    //   Number(ReceiverId),
    // );

    // this.eventsGateway.server.to(`/${roomId}`).emit('message', message);
    // this.eventsGateway.server.to(String(ReceiverId)).emit(`message`, message);
    // this.eventsGateway.server.to(receiverSocketId).emit(`message`, message);
    this.eventsGateway.server.to(String(ReceiverId)).emit(`message`, message);
  }
}
