import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.enableCors();
  // use Pipes for the validation and transformation of input data（dto）
  // 利用管道验证和转换输入数据
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // use Interceptors for the filtration of output data（Sensitive fields）
  // 利用拦截器过滤输出数据的敏感字段
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const configService = app.get(ConfigService);
  const appName = configService.get<string>('APP_NAME')!;
  console.log(typeof configService.get<boolean>('DB_SYNCHRONIZE'),'--------DB_SYNCHRONIZE');
  
  const config = new DocumentBuilder()
  .setTitle(appName)
  .setDescription(`${appName} API document`)
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 127.0.0.1:3000/api
  await app.listen(configService.get('APP_PORT', 3000));
}
bootstrap();
