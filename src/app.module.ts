import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ChatModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
