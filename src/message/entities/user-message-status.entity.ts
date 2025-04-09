import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Message } from './message.entity';

@Entity()
@Unique(['userId', 'messageId']) // Joint unique index 联合唯一索引
export class UserMessageStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  isRead: boolean

  @ManyToOne(()=>User)
  user: User

  @ManyToOne(()=>Message)
  message: Message

  @Column()
  userId: number;

  @Column()
  messageId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}