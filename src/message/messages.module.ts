import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { UserMessageStatus } from 'src/message/entities/user-message-status.entity';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/authentication/auth.module';

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
