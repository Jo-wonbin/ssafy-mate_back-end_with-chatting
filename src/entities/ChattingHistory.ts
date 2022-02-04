import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { ChattingRoom } from './ChattingRoom';

@Index('FKfue3shqn8re10j2mup5t1rrui', ['senderId'], {})
@Index('FKrwjxi3xcba10c40pliaqd5pc7', ['roomId'], {})
@Entity('chatting_history', { schema: 'ssafy_mate_test' })
export class ChattingHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @Column('varchar', { name: 'sent_time', length: 100 })
  sentTime: string;

  @Column('varchar', { name: 'room_id', length: 100 })
  roomId: string;

  @Column('bigint', { name: 'sender_id' })
  senderId: bigint;

  @ManyToOne(() => User, (user) => user.chattingHistories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'sender_id', referencedColumnName: 'id' }])
  sender: User;

  @ManyToOne(
    () => ChattingRoom,
    (chattingRoom) => chattingRoom.chattingHistories,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'roomId' }])
  room: ChattingRoom;
}
