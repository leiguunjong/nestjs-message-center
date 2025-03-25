import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  // @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // @Expose({groups: ['user']})
  // @Column({default: false})
  // isRead: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({name: 'created_at'})
  createdAt: Date;
}