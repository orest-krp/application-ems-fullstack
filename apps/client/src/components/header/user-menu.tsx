import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Plus, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UserResponse } from "@ems-fullstack/utils";

interface UserMenuProps {
  user: UserResponse;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => navigate("/create-event")} className="flex gap-1">
        <Plus />
        Create Event
      </Button>

      <div className="flex items-center gap-2">
        <Avatar className="w-9 h-9">
          <AvatarFallback>
            <UserIcon className="w-5" />
          </AvatarFallback>
        </Avatar>

        <span className="text-sm font-medium">{user.name}</span>

        <Button onClick={onLogout} variant="ghost">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
