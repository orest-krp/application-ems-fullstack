import { useEffect, useState } from "react";
import {
  Calendar,
  LogIn,
  LogOut,
  Menu,
  Plus,
  SquareChartGantt,
  User as UserIcon,
  UserRoundPlus
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import clsx from "clsx";
import { mutate } from "swr";
import { useMutation } from "@/hooks/use-mutation";
import { useAuth } from "@/hooks/use-auth";
import { mutateFirstKey } from "@/lib/utils";

export function Header() {
  const navigate = useNavigate();
  const { mutate: logout } = useMutation("/auth/logout", "POST", {
    onSuccess: () => {
      toast.success("User logged out!");
      mutate("/user/me");
      mutateFirstKey("/event");
      navigate("/events");
    }
  });
  const {
    user: { data: user }
  } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  const handleLogout = async () => {
    await logout();
    mutateFirstKey("/event");
  };

  return (
    <header className="border-b bg-background px-4 md:px-8 w-full">
      <div className="flex items-center justify-between w-full py-4">
        <h1
          onClick={() => navigate("/events")}
          className="text-2xl font-bold cursor-pointer"
        >
          EMS
        </h1>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/events"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center hover:text-primary",
                !isActive && "text-muted-foreground"
              )
            }
          >
            <SquareChartGantt className="h-4 w-4 mr-2" />
            Events
          </NavLink>
          <NavLink
            to="/my-events"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center hover:text-primary",
                !isActive && "text-muted-foreground"
              )
            }
          >
            <Calendar className="h-4 w-4 mr-2" />
            My Events
          </NavLink>
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/create-event")}
                className="flex gap-1"
              >
                <Plus />
                Create Event
              </Button>

              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9">
                  <AvatarFallback>
                    <UserIcon className="w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.name}</span>
                <Button onClick={handleLogout} variant="ghost">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu
            open={mobileOpen}
            onOpenChange={() => setMobileOpen(!mobileOpen)}
          >
            <DropdownMenuTrigger
              onClick={() => {
                setMobileOpen(true);
              }}
              asChild
            >
              <Button variant="link" size="icon-lg">
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-76">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => navigate("/events")}
                >
                  <SquareChartGantt className="mr-2" />
                  Events
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => navigate("/my-events")}
                >
                  <Calendar className="mr-2" />
                  My Events
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem
                    className="p-3"
                    onClick={() => navigate("/create-event")}
                  >
                    <Plus className="mr-2" />
                    Create Event
                  </DropdownMenuItem>

                  <DropdownMenuItem className="p-3" disabled>
                    <UserIcon className="mr-2" />
                    {user?.name}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="p-3"
                    onClick={async () => {
                      await logout();
                      toast.success("User logged out!");
                    }}
                  >
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
      </div>
    </header>
  );
}
