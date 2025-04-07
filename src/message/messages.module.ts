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
          synchronize: configService.get<string>('NODE_ENV') === 'development',
        })
    }),
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
