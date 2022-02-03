import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ChattingHistory } from './ChattingHistory';
import { User } from './User';

@Index('FK3prhf7dwuih6ave90ixpcnun9', ['userIdSmall'], {})
@Index('FK5gpnevw8t09x9tcdak80nksmo', ['userIdBig'], {})
@Entity('chatting_room', { schema: 'ssafy_mate_test' })
export class ChattingRoom {
  @Column('varchar', { primary: true, name: 'room_id', length: 255 })
  roomId: string;

  @Column('bigint', { name: 'user_id_small' })
  userIdSmall: string;

  @Column('bigint', { name: 'user_id_big' })
  userIdBig: string;

  @OneToMany(() => ChattingHistory, (chattingHistory) => chattingHistory.room)
  chattingHistories: ChattingHistory[];

  @ManyToOne(() => User, (user) => user.chattingRooms, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id_small', referencedColumnName: 'id' }])
  userIdSmall2: User;

  @ManyToOne(() => User, (user) => user.chattingRooms2, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id_big', referencedColumnName: 'id' }])
  userIdBig2: User;
}
