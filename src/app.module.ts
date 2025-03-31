import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { AuthModule } from './guards/authentication/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MessageModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
