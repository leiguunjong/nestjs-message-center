import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { UsersModule } from 'src/users/users.module';
import { UserMessageStatus } from 'src/users/user-message-status.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
        })
    }),
    TypeOrmModule.forFeature([Message, UserMessageStatus]),
    UsersModule // authGuard需要用到usersService
  ],
  controllers: [MessageController],
  providers: [
    MessageService
  ]
})
export class MessageModule { }
