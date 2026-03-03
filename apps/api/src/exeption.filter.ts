import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

interface FetchError {
  statusCode: number;
  error: string;
  message: string[] | string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string[] | string = 'Internal server error';
    let error = 'Server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const fetchError = res as Partial<FetchError>;
        message = fetchError.message ?? message;
        error = fetchError.error ?? error;
      }
    }

    response.status(status).json({ statusCode: status, error, message });
  }
}
