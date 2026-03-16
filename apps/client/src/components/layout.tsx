import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { useAuth } from "@/hooks/use-auth";
import { lazy, Suspense } from "react";

const AiAssistant = lazy(() => import("./ai-assistant/"));

export function Layout() {
  const {
    user: { data: user }
  } = useAuth();

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main className="px-4 md:px-8 h-full">
        {user && (
          <Suspense fallback={null}>
            <AiAssistant />
          </Suspense>
        )}

        <Outlet />
      </main>
    </div>
  );
}
