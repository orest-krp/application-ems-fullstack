import { useCallback } from "react";
import type { FieldErrors, Resolver } from "react-hook-form";
import { ValidationError, type AnyObjectSchema, type InferType } from "yup";

export function useYupValidationResolver<TSchema extends AnyObjectSchema>(
  validationSchema: TSchema
): Resolver<InferType<TSchema>> {
  return useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors: Record<string, any> = {};

          error.inner.forEach((err) => {
            if (!err.path) return;

            errors[err.path] = {
              type: err.type ?? "validation",
              message: err.message
            };
          });

          return {
            values: {} as InferType<TSchema>,
            errors: errors as FieldErrors<InferType<TSchema>>
          };
        }

        throw error;
      }
    },
    [validationSchema]
  );
}
