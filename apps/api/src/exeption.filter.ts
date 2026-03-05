import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ValidationError } from 'yup';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages = ['Server error'];
    let error = 'Server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      if (typeof res === 'string') {
        messages = [res];
      } else if (typeof res === 'object' && res !== null) {
        error = exception.name;
        messages = [exception.message];
      }
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      error = 'ValidationError';

      if (exception.inner && exception.inner.length > 0) {
        messages = exception.inner.map((err) => err.message);
      } else {
        messages = exception.errors;
      }
    }

    response.status(status).json({ statusCode: status, error, messages });
  }
}
