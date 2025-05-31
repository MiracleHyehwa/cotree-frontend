import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface Tab {
  key: string;
  label: string;
  highlight?: boolean;
}

const TABS: Tab[] = [
  { label: "홈", key: "home" },
  { label: "추천", key: "recommended" },
  { label: "프리미엄", key: "premium", highlight: true },
  { label: "베스트", key: "best" },
  { label: "세일", key: "sale", highlight: true },
];

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div className="flex items-center justify-around w-full px-4 py-2">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="relative flex flex-col items-center">
            <span
              className={cn(
                "text-sm font-medium px-4 py-2 transition-all duration-200",
                isActive ? "bg-foreground text-white rounded-full" : "text-muted-foreground"
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
