import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
