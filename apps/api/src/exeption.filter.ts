import { FetchError } from '@ems-fullstack/utils';
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
    let messages: string[] = ['Server error'];
    let error = 'Server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        messages = [res];
        error = exception.name;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as Partial<FetchError> & {
          message?: string | string[];
        };

        error = r.error ?? exception.name;

        if (Array.isArray(r.messages)) {
          messages = r.messages;
        } else if (Array.isArray(r.message)) {
          messages = r.message;
        } else if (typeof r.message === 'string') {
          messages = [r.message];
        }
      }
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      error = 'ValidationError';

      messages = exception.inner?.length
        ? exception.inner.map((err) => err.message)
        : exception.errors;
    }

    response.status(status).json({
      statusCode: status,
      error,
      messages,
    });
  }
}
