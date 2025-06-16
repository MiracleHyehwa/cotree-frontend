import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Suspense, useState } from "react";
import { TreeOverlay } from "@/pages/home/sections";
import { TreeCanvas } from "@/pages/home/tree/treeCanvas";
import { ErrorBoundary } from "react-error-boundary";

interface Tab {
  key: string;
  label: string;
  path?: string;
}

const TABS: Tab[] = [
  { key: "home", label: "홈", path: "/" },
  { key: "eco", label: "친환경", path: "/eco" },
  { key: "recommend", label: "추천", path: "/recommend" },
  { key: "my-tree", label: "내 기여도" },
];

export default function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const activeTab = TABS.find((tab) => tab.path === location.pathname)?.key ?? "home";

  return (
    <>
      <div className="flex items-center justify-start w-full px-4 py-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const className = cn(
            "relative flex flex-col items-center mr-2 cursor-pointer rounded-full",
            isActive && "bg-primary text-primary-foreground"
          );

          return tab.path ? (
            <Button key={tab.key} asChild variant={isActive ? "default" : "ghost"} className={className}>
              <Link to={tab.path}>{tab.label}</Link>
            </Button>
          ) : (
            <Button key={tab.key} variant="ghost" onClick={() => setIsOverlayOpen(true)} className={className}>
              {tab.label}
            </Button>
          );
        })}
      </div>
      <TreeOverlay open={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <TreeOverlay.ErrorFallback error={error} onClose={() => setIsOverlayOpen(false)} />
          )}
        >
          <Suspense fallback={<TreeOverlay.Skeleton />}>
            <>
              <TreeOverlay.Header />
              <TreeCanvas />
              <TreeOverlay.Footer
                onClose={() => setIsOverlayOpen(false)}
                onNavigate={() => navigate("/mypage/environment")}
              />
            </>
          </Suspense>
        </ErrorBoundary>
      </TreeOverlay>
    </>
  );
}
