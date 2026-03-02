import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Schema, ValidationError } from 'yup';

@Injectable()
export class Validator<T> implements PipeTransform {
  constructor(private schema: Schema<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.validateSync(value, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string[]> = error.inner.reduce(
          (acc, err) => {
            const path = err.path || 'unknown';
            acc[path] = acc[path] ? [...acc[path], err.message] : [err.message];
            return acc;
          },
          {} as Record<string, string[]>,
        );

        throw new HttpException(
          {
            message: 'Validation failed',
            errors,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw new HttpException(
        {
          message: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
