import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import * as ormconfig from '../ormconfig';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChattingHistory } from './entities/ChattingHistory';
import { ChattingRoom } from './entities/ChattingRoom';
import { User } from './entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ChatModule,
    EventsModule,
    TypeOrmModule.forFeature([ChattingHistory, ChattingRoom, User]),
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService],
})
export class AppModule {}
