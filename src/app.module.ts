import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './message/messages.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

@Module({
  imports: [
    MessagesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env',
      ],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === 'development'
              ? {
                level: 'debug',
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                  ignore: 'pid,hostname'
                }
              }
              : {
                level: 'info',
                target: 'pino-roll',
                options: {
                  file: join(__dirname,'logs',`log`),
                  frequency: 'daily',
                  dateFormat: 'yyyy-MM-dd',
                  mkdir: true,
                  size: '10M',
                }
              }
          ]
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
