import { FetchError } from '@ems-fullstack/types';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Schema, ValidationError } from 'yup';

@Injectable()
export class YupValidationPipe<T> implements PipeTransform {
  constructor(private schema: Schema<T>) {}

  async transform(value: unknown): Promise<T> {
    try {
      return await this.schema.validate(value, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string[]> = error.inner.reduce(
          (acc, err) => {
            const path = err.path || 'body';
            acc[path] = acc[path] ? [...acc[path], err.message] : [err.message];
            return acc;
          },
          {} as Record<string, string[]>,
        );

        const fetchError: FetchError = {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Unprocessable Entity',
          message: Object.values(errors).flat(),
        };
        throw new HttpException(fetchError, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const fetchError: FetchError = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'Something went wrong',
      };

      throw new HttpException(fetchError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
