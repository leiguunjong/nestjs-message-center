import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from '../users/users.module';
import { UserMessageStatus } from './entities/user-message-status.entity';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, UserMessageStatus]),
    UsersModule,
    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService
  ]
})
export class MessagesModule { }
