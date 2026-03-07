import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="px-4 md:px-8 h-full flex-1 flex">
        <Outlet />
      </main>
    </div>
  );
}
