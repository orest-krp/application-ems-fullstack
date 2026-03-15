import type { LoginUser, UserResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import { useMutation } from "./use-mutation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const user = useApiGet<UserResponse>("/users/me", "/users/me", {
    revalidateOnFocus: false,
    revalidateIfStale: false
  });
  const navigate = useNavigate();
  const {
    mutate: login,
    error: loginError,
    setError: setLoginError
  } = useMutation<LoginUser>(
    "/auth/login",
    "POST",
    {
      onSuccess: () => {
        navigate("/events");
        user.mutate();
        toast.success("User has been authorized!");
      }
    },
    false
  );
  const {
    mutate: logout,
    error: logoutError,
    setError: setLogoutError
  } = useMutation("/auth/logout", "POST", {
    onSuccess: () => {
      user.mutate();
      navigate("/events");
      toast.success("User has been logged out!");
    }
  });
  const {
    mutate: register,
    error: registerError,
    setError: setRegisterError
  } = useMutation(
    "/auth/register",
    "POST",
    {
      onSuccess: () => {
        navigate("/login");
        toast.success("User has been registered!");
      }
    },
    false
  );

  return {
    user,
    login,
    logout,
    register,
    errors: {
      loginError,
      logoutError,
      registerError
    },
    setLoginError,
    setLogoutError,
    setRegisterError
  };
}
