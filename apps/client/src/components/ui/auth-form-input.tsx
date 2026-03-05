import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormInputProps<
  T extends FieldValues
> extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export function AuthFormInput<T extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  icon,
  isPassword = false,
  ...rest
}: AuthFormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex flex-col space-y-1">
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <div className="flex items-center border rounded-md p-2">
              {icon && <div className="mr-2">{icon}</div>}
              <Input
                {...field}
                id={name}
                type={isPassword && showPassword ? "text" : type}
                aria-invalid={fieldState.invalid}
                {...rest}
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              )}
            </div>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
