import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-login";
import { loginUserSchema, type LoginUserDTO } from "@ems-fullstack/types";
import { useYupValidationResolver } from "@/hooks/use-yup-resolver";
import { FormInput } from "@/components/ui/auth-form-input";
import { toast } from "sonner";
import { ErrorMessage } from "@/components/ui/error-message";

export function Login() {
  const { login, error, setError } = useLogin();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<LoginUserDTO>({
    resolver: useYupValidationResolver(loginUserSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: LoginUserDTO) => {
    setError(null);
    await login(data.email, data.password);
    await navigate("/events");
    toast.success("User has been authorized!");
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
            onChange={() => setError(null)}
          >
            <div className="flex flex-col gap-3">
              <FormInput
                name="email"
                label="Email"
                control={control}
                placeholder="you@example.com"
                type="email"
                icon={<Mail className="w-4 h-4 text-muted-foreground" />}
              />
              <FormInput
                name="password"
                label="Password"
                control={control}
                placeholder="********"
                type="password"
                icon={<Lock className="w-4 h-4 text-muted-foreground" />}
                isPassword
              />
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </div>
            <ErrorMessage error={error} />
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
