import { useCallback } from "react";
import {
  type Resolver,
  type FieldErrors,
  type FieldError,
} from "react-hook-form";
import { type AnyObjectSchema, type InferType, ValidationError } from "yup";
import { set } from "lodash";

export const useYupValidationResolver = <TSchema extends AnyObjectSchema>(
  validationSchema: TSchema,
): Resolver<InferType<TSchema>> => {
  return useCallback<Resolver<InferType<TSchema>>>(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return { values, errors: {} };
      } catch (err: unknown) {
        if (err instanceof ValidationError) {
          const errors: FieldErrors<InferType<TSchema>> = {};
          err.inner.forEach((currentError) => {
            if (!currentError.path) return;

            set(errors, currentError.path, {
              type: currentError.type ?? "validation",
              message: currentError.message,
            } as FieldError);
          });

          return { values: {} as InferType<TSchema>, errors };
        }
        throw err;
      }
    },
    [validationSchema],
  );
};
