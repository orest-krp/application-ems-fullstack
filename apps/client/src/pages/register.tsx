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
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/use-register";
import { registerUserShema, type RegisterUserDto } from "@ems-fullstack/types";
import { useYupValidationResolver } from "@/hooks/use-yup-resolver";
import { FormInput } from "@/components/ui/auth-form-input";
import ErrorMessage from "@/components/ui/error-message";
import { toast } from "sonner";

export function Register() {
  const { register: registerUser, error, setError } = useRegister();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<RegisterUserDto>({
    resolver: useYupValidationResolver(registerUserShema),
    defaultValues: { name: "", email: "", password: "" }
  });

  const onSubmit = async (data: RegisterUserDto) => {
    setError(null);
    registerUser(data.name, data.email, data.password).then(() => {
      navigate("/login");
      toast.success("User has been registered!");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <FormInput
                name="name"
                label="Name"
                control={control}
                autoComplete="new-password"
                placeholder="Your user name"
                type="text"
                icon={<User className="w-4 h-4 text-secondary-text" />}
              />
              <FormInput
                name="email"
                label="Email"
                control={control}
                autoComplete="new-password"
                placeholder="you@example.com"
                type="email"
                icon={<Mail className="w-4 h-4 text-secondary-text" />}
              />
              <FormInput
                name="password"
                label="Password"
                control={control}
                autoComplete="new-password"
                placeholder="********"
                type="password"
                icon={<Lock className="w-4 h-4 text-secondary-text" />}
                isPassword
              />
              <Button type="submit" className="w-full mt-2">
                Register
              </Button>
            </FieldGroup>
            <ErrorMessage error={error} />
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
