// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  // 👇 เพิ่มโค้ดส่วนนี้เข้าไป
  app.enableCors({
    origin: 'http://localhost:5173', // URL ของ Frontend Vite
    credentials: true, // อนุญาตให้ส่ง cookies หรือ authorization headers
  });

  // ใช้ HttpExceptionFilter ทั่วทั้งแอปพลิเคชัน
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // กำจัด properties ที่ไม่ได้ระบุใน DTO
      forbidNonWhitelisted: true, // โยน error ถ้ามี properties ที่ไม่ได้ระบุใน DTO
      transform: true, // แปลง payloads ให้เป็น instance ของ class ที่กำหนดใน DTO
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message:
        'Too many requests from this IP, please try again after 15 minuutes',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('GodBless You API')
    .setDescription('The API documentation for the GodBless project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
