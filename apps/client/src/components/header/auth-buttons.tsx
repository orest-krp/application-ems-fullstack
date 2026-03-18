import { Button } from "../ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={() => navigate("/login")}>
        <LogIn />
        Login
      </Button>

      <Button onClick={() => navigate("/register")}>
        <UserRoundPlus />
        Sign Up
      </Button>
    </div>
  );
}
