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

interface FormInputProps<T extends FieldValues> extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  type = "text",
  icon,
  isPassword = false,
  ...rest
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex flex-col space-y-1">
            <FieldLabel htmlFor={name as string}>{label}</FieldLabel>
            <div className="flex items-center border rounded-md p-2">
              {icon && <div className="mr-2">{icon}</div>}
              <Input
                {...field}
                id={name as string}
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                {...rest}
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-2 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
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
