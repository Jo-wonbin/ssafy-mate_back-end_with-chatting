import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  postChat(@Body() body: MessageDto) {
    return this.chatService.postChat(
      body.roomId,
      body.senderId,
      body.sentTime,
      body.content,
    );
  }
}
