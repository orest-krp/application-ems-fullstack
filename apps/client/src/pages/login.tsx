import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginUserSchema, type LoginUser } from "@ems-fullstack/utils";
import { useYupValidationResolver } from "@/hooks/use-yup-resolver";
import { AuthFormInput } from "@/components/ui/auth-form-input";
import { ErrorMessage } from "@/components/ui/error-message";
import { useAuth } from "@/hooks/use-auth";

export function Login() {
  const {
    login,
    errors: { loginError },
    setLoginError
  } = useAuth();

  const { handleSubmit, control } = useForm<LoginUser>({
    resolver: useYupValidationResolver(loginUserSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: LoginUser) => {
    setLoginError(null);
    await login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-foreground">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back! Please login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit((data) => void onSubmit(data))}
            onChange={() => setLoginError(null)}
          >
            <div className="flex flex-col gap-3">
              <AuthFormInput
                name="email"
                label="Email"
                control={control}
                placeholder="you@example.com"
                type="email"
                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              />
              <AuthFormInput
                name="password"
                label="Password"
                control={control}
                placeholder="********"
                type="password"
                icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                isPassword
              />
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </div>
            <ErrorMessage error={loginError} />
            <div className="mt-4 text-center">
              <Link to="/register" className="text-sm hover:underline">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
