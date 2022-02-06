import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageDto } from '../chat/dto/message.dto';

const port = process.env.PORT;

// 연결 포트 설정
@WebSocketGateway(parseInt(port))
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // 서버 인스턴스 접근
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  // message 인 emit 요청받음
  @SubscribeMessage('message')
  handleEvent(
    @MessageBody() data: MessageDto, // Message 데이터
    @ConnectedSocket() client: Socket,
  ) {
    return data;
  }

  // 서버 시작
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  // 연결
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  // 연결 해제
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnect: ${client.id}`);
  }
}
