import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChattingHistory } from '../entities/ChattingHistory';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChattingHistory]), EventsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
