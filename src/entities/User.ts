import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChattingHistory } from './ChattingHistory';
import { ChattingRoom } from './ChattingRoom';

@Index('UK_ob8kqyqqgmefl0aco34akdtpe', ['email'], { unique: true })
@Entity('user', { schema: 'ssafy_mate_test' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'agreement', length: 255 })
  agreement: string;

  @Column('varchar', { name: 'campus', length: 255 })
  campus: string;

  @Column('varchar', {
    name: 'common_project_track',
    nullable: true,
    length: 255,
  })
  commonProjectTrack: string | null;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'etc_url', nullable: true, length: 255 })
  etcUrl: string | null;

  @Column('varchar', { name: 'github_url', nullable: true, length: 255 })
  githubUrl: string | null;

  @Column('varchar', { name: 'job1', length: 255 })
  job1: string;

  @Column('varchar', { name: 'job2', nullable: true, length: 255 })
  job2: string | null;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'profile_img', nullable: true, length: 255 })
  profileImg: string | null;

  @Column('varchar', { name: 'roles', nullable: true, length: 255 })
  roles: string | null;

  @Column('varchar', { name: 'self_introduction', length: 255 })
  selfIntroduction: string;

  @Column('varchar', {
    name: 'specialization_project_track',
    nullable: true,
    length: 255,
  })
  specializationProjectTrack: string | null;

  @Column('varchar', { name: 'ssafy_track', length: 255 })
  ssafyTrack: string;

  @Column('varchar', { name: 'student_name', length: 255 })
  studentName: string;

  @Column('varchar', { name: 'student_number', length: 255 })
  studentNumber: string;

  @OneToMany(() => ChattingHistory, (chattingHistory) => chattingHistory.sender)
  chattingHistories: ChattingHistory[];

  @OneToMany(() => ChattingRoom, (chattingRoom) => chattingRoom.userIdSmall2)
  chattingRooms: ChattingRoom[];

  @OneToMany(() => ChattingRoom, (chattingRoom) => chattingRoom.userIdBig2)
  chattingRooms2: ChattingRoom[];
}
