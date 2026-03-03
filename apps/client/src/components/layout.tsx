import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout() {
  return (
    <div>
      <Header />
      <main className="px-4 md:px-0">
        <Outlet />
      </main>
    </div>
  );
}
