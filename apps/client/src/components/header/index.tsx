import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "./logo";
import { AuthButtons } from "./auth-buttons";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { HeaderNavigaiton } from "./header-navigation";
import { useRefresh } from "../../hooks/use-refresh";
import { useChatStore } from "@/store/chat-store";

export function Header() {
  const {
    user: { data: user }
  } = useAuth();

  const { refreshAllEvents } = useRefresh();

  const { logout } = useAuth();
  const clearMessages = useChatStore((store) => store.clearMessages);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobileOpen(false);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    clearMessages();
    refreshAllEvents();
  };

  return (
    <header className="border-b bg-background px-4 md:px-8 w-full">
      <div className="flex items-center justify-between w-full py-4">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          <HeaderNavigaiton />
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <AuthButtons />
          )}
        </div>

        <MobileMenu
          user={user}
          open={mobileOpen}
          setOpen={setMobileOpen}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
