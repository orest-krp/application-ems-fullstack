import { NavLink } from "react-router-dom";

export function Logo() {
  return (
    <h1 className="text-2xl font-bold cursor-pointer">
      <NavLink to="/events">EMS</NavLink>
    </h1>
  );
}
