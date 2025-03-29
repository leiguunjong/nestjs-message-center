import { Exclude, Expose } from 'class-transformer';
import { UserMessageStatus } from 'src/guards/authentication/users/user-message-status.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Message {
  // @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(
    () => UserMessageStatus,
    (status) => status.message,
    { cascade: true } // cascading delete 启用级联删除
  )
  statuses: UserMessageStatus[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({name: 'created_at'})
  createdAt: Date;
}