import * as yup from "yup";

export const registerUserShema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be between 3 and 20 characters")
    .max(20, "Username must be between 3 and 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Username can only contain letters, numbers, underscores, and spaces"
    ),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email is not valid"),

  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/(?=.*\d)/, "Password must contain at least one number")
});

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email is not valid"),

  password: yup.string().trim().required("Password is required")
});

export type LoginUserDTO = yup.InferType<typeof loginUserSchema>;
export type RegisterUserDto = yup.InferType<typeof registerUserShema>;
