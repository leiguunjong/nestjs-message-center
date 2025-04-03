import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { User } from './users.entity';
import { Message } from 'src/message/message.entity';

@Entity()
@Unique(['userId', 'messageId']) /** Unique Constraint
                                     additional SQL execution is required:
                                     ALTER TABLE user_message_status ADD UNIQUE INDEX idx_user_message (userId, messageId);
                                     唯一约束
                                     需要额外执行SQL语句：
                                     ALTER TABLE user_message_status ADD UNIQUE INDEX idx_user_message (userId, messageId);
                                  */
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