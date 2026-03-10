import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),

  JWT_ACCESS_SECRET: Joi.string().min(10).required(),
  JWT_REFRESH_SECRET: Joi.string().min(10).required(),

  JWT_ACCESS_EXPIRATION_TIME: Joi.string()
    .pattern(/^\d+(s|m|h|d)$/)
    .required(),

  JWT_REFRESH_EXPIRATION_TIME: Joi.string()
    .pattern(/^\d+(s|m|h|d)$/)
    .required(),
});
