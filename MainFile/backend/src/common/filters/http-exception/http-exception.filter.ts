// src/common/filters/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // 👈 ดักจับ Error ที่เป็น HttpException เท่านั้น
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // ดึง message จาก exception
    const errorResponse = exception.getResponse();
    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message || 'An unexpected error occurred';

    // จัดรูปแบบ response ที่เราต้องการ
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
