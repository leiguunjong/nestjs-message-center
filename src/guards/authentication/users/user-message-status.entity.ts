import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Message } from 'src/message/message.entity';

@Entity()
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