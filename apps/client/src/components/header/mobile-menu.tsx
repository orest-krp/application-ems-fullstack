import {
  Menu,
  Calendar,
  SquareChartGantt,
  LogIn,
  LogOut,
  Plus,
  UserIcon,
  UserRoundPlus
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import type { UserResponse } from "@ems-fullstack/utils";
import type { Dispatch, SetStateAction } from "react";

interface MobileMenuProps {
  user: UserResponse | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onLogout: () => void;
}

export function MobileMenu({ user, open, setOpen, onLogout }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon-lg">
            <Menu className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-76">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/events")}>
              <SquareChartGantt className="mr-2" />
              Events
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/my-events")}>
              <Calendar className="mr-2" />
              My Events
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {user ? (
            <>
              <DropdownMenuItem onClick={() => navigate("/create-event")}>
                <Plus className="mr-2" />
                Create Event
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <UserIcon className="mr-2" />
                {user.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => navigate("/login")}>
                <LogIn className="mr-2" />
                Login
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/register")}>
                <UserRoundPlus className="mr-2" />
                Sign Up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
