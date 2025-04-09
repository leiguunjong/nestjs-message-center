import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserMessageStatus } from 'src/message/entities/user-message-status.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'user' })
  @Exclude()
  role: string;

  @OneToMany(
    () => UserMessageStatus,
    (status) => status.user,
    { cascade: true }  // cascading delete 启用级联删除
  )
  statuses: UserMessageStatus[];

  @CreateDateColumn()
  @Expose()
  createdAt: Date;
}