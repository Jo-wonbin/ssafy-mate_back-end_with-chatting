import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  postChat(
    @Param('roomId') roomId: string,
    @Param('senderId', ParseIntPipe) senderId: bigint,
    @Param('sentTime') sentTime: string,
    @Param('content') content: string,
  ) {
    return this.chatService.postChat({
      roomId,
      senderId,
      sentTime,
      content,
    });
  }
}
