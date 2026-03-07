import type { LoginUserDTO, UserResponseDTO } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import { useMutation } from "./use-mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const user = useApiGet<UserResponseDTO>("/user/me");
  const navigate = useNavigate();
  const {
    mutate: login,
    error: loginError,
    setError: setLoginError
  } = useMutation<LoginUserDTO>(
    "/auth/login",
    "POST",
    {
      onSuccess: () => {
        navigate("/events");
        mutate("/user/me");
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
      mutate("/user/me");
      navigate("/events");
      toast.success("User has been logged out!");
    }
  });
  const {
    mutate: register,
    error: registerError,
    setError: setRegisterError
  } = useMutation("/auth/register", "POST", {
    onSuccess: () => {
      navigate("/login");
      toast.success("User has been registered!");
    }
  });

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
