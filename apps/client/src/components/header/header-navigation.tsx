import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Calendar, SquareChartGantt } from "lucide-react";

export function HeaderNavigaiton() {
  return (
    <>
      <NavLink
        to="/events"
        end
        className={({ isActive }) =>
          clsx(
            "flex items-center hover:text-primary transition-colors duration-300",
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
            "flex items-center hover:text-primary transition-colors duration-300",
            !isActive && "text-muted-foreground"
          )
        }
      >
        <Calendar className="h-4 w-4 mr-2" />
        My Events
      </NavLink>
    </>
  );
}
