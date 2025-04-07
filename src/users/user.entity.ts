import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({unique: true})
  @Column()
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({default: 'user'})
  @Exclude()
  role: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;
}