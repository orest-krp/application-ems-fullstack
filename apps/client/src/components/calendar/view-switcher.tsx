import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewSwitcherProps {
  view: "month" | "week";
  setView: (view: "month" | "week") => void;
}

const TAB_PADDING = 2;

export function ViewSwitcher({ view, setView }: ViewSwitcherProps) {
  const monthRef = useRef<HTMLButtonElement>(null);
  const weekRef = useRef<HTMLButtonElement>(null);
  const [activeStyle, setActiveStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const activeRef = view === "month" ? monthRef.current : weekRef.current;
    if (activeRef) {
      setActiveStyle({
        width: activeRef.offsetWidth,
        height: activeRef.offsetHeight + TAB_PADDING,
        left: activeRef.offsetLeft,
        top: activeRef.offsetTop - TAB_PADDING
      });
    }
  }, [view]);

  const tabClassName =
    "flex items-center gap-1 px-4 py-2 text-sm font-medium delay-100 transition-colors duration-300 " +
    "data-[state=active]:bg-transparent " +
    "data-[state=active]:text-primary-foreground " +
    "data-[state=active]:shadow-none " +
    "active:bg-transparent active:shadow-none";

  return (
    <div className="relative inline-block">
      <Tabs
        value={view}
        onValueChange={(val) => setView(val as "month" | "week")}
      >
        <TabsList className="relative flex rounded-lg border bg-background p-0">
          <span
            className="absolute bg-primary rounded-lg transition-all duration-300"
            style={activeStyle}
          />

          <TabsTrigger value="month" ref={monthRef} asChild>
            <button className={tabClassName}>
              <CalendarIcon className="h-4 w-4" />
              Month
            </button>
          </TabsTrigger>

          <TabsTrigger value="week" ref={weekRef} asChild>
            <button className={tabClassName}>
              <List className="h-4 w-4" />
              Week
            </button>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
