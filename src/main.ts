import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.enableCors(); // 跨域
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // 自动移除非装饰器声明的字段
      // forbidNonWhitelisted: true, // 抛出错误提示非法字段
      transform: true,        // 自动转换请求数据到 DTO 类型
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT', 3000));
}
bootstrap();
