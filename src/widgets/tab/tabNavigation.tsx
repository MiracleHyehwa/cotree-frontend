import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface Tab {
  key: string;
  label: string;
  path: string;
}

const TABS: Tab[] = [
  { label: "홈", key: "home", path: "/" },
  { label: "카테고리", key: "category", path: "/category" },
  { label: "친환경", key: "eco", path: "/eco" },
];

export default function TabNavigation() {
  const location = useLocation();
  const activeTab = TABS.find((tab) => tab.path === location.pathname)?.key ?? "home";

  return (
    <div className="flex items-center justify-start w-full px-4 py-2">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Button
            key={tab.key}
            variant={isActive ? "default" : "ghost"}
            asChild
            className={cn(
              "relative flex flex-col items-center mr-2 cursor-pointer rounded-full",
              isActive && "bg-primary text-white"
            )}
          >
            <Link to={tab.path}>{tab.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
