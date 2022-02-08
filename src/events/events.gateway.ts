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
import { onlineMap } from './onlineMap';

const port = process.env.PORT;

// 연결 포트 설정
@WebSocketGateway(parseInt(port), { namespace: /\/dm-.+/ })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // 서버 인스턴스 접근
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  // message 인 emit 요청받음
  // @SubscribeMessage('message')
  // handleEvent(
  //   @MessageBody() data: MessageDto, // Message 데이터
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   return data;
  // }

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: { id: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const newNamespace = socket.nsp;
    console.log('login', newNamespace);
    onlineMap[socket.nsp.name][socket.id] = data.id;
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
    // data.channels.forEach((channel) => {
    //   console.log('join', socket.nsp.name, channel);
    //   socket.join(`${socket.nsp.name}-${channel}`);
    // });
  }

  // 서버 시작
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  // 연결
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connected', socket.nsp.name);
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    // broadcast to all clients in the given sub-namespace
    socket.emit('hello', socket.nsp.name);
  }

  // 연결 해제
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnected', socket.nsp.name);
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }
}
