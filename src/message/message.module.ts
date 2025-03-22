import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/authorization/roles.guard';
import { UsersModule } from 'src/guards/authentication/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',      // 数据库主机
      port: 3306,            // 端口
      username: 'your_username',      // 用户名
      password: 'your_password', // 密码
      database: 'message',   // 数据库名
      autoLoadEntities: true,
      synchronize: true,     // 自动同步数据库结构（生产环境建议关闭）
    }),
    TypeOrmModule.forFeature([Message]),
    UsersModule // authGuard需要用到usersService
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ]
})
export class MessageModule { }
