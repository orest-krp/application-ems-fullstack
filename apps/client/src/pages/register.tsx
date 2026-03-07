import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Link } from "react-router-dom";
import { registerUserShema, type RegisterUserDto } from "@ems-fullstack/utils";
import { useYupValidationResolver } from "@/hooks/use-yup-resolver";
import { AuthFormInput } from "@/components/ui/auth-form-input";
import { ErrorMessage } from "@/components/ui/error-message";
import { useAuth } from "@/hooks/use-auth";

export function Register() {
  const {
    register,
    errors: { registerError },
    setRegisterError
  } = useAuth();

  const { handleSubmit, control } = useForm<RegisterUserDto>({
    resolver: useYupValidationResolver(registerUserShema),
    defaultValues: { name: "", email: "", password: "" }
  });

  const onSubmit = async (data: RegisterUserDto) => {
    setRegisterError(null);
    await register(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-foreground">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <AuthFormInput
                name="name"
                label="Name"
                control={control}
                autoComplete="new-password"
                placeholder="Your user name"
                type="text"
                icon={<User className="h-4 w-4 text-muted-foreground" />}
              />
              <AuthFormInput
                name="email"
                label="Email"
                control={control}
                autoComplete="new-password"
                placeholder="you@example.com"
                type="email"
                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              />
              <AuthFormInput
                name="password"
                label="Password"
                control={control}
                autoComplete="new-password"
                placeholder="********"
                type="password"
                icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                isPassword
              />
              <Button type="submit" className="w-full mt-2">
                Register
              </Button>
            </FieldGroup>
            <ErrorMessage error={registerError} />
            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
