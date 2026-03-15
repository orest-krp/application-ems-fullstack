import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main className="px-4 md:px-8 h-full">
        <Outlet />
      </main>
    </div>
  );
}
