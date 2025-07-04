import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { TreeOverlay } from "@/pages/home/sections";
import { TreeCanvas } from "@/pages/home/tree/treeCanvas";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { environmentKeys } from "@/entities/environment/api/queryOptions";
import { getMyTreeSummary } from "@/entities/environment/api/get";
import { Swiper, SwiperSlide } from "swiper/react";

interface Tab {
  key: string;
  label: string;
  path?: string;
}

const TABS: Tab[] = [
  { key: "home", label: "홈", path: "/" },
  { key: "eco", label: "친환경", path: "/eco" },
  { key: "recommend", label: "추천", path: "/recommend" },
  { key: "event", label: "특가할인", path: "/event" },
  { key: "my-tree", label: "내 기여도" },
];

export default function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const activeTab = TABS.find((tab) => tab.path === location.pathname)?.key ?? "home";

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: environmentKeys.getMyTreeSummary,
      queryFn: () => getMyTreeSummary(),
    });
  }, [queryClient]);

  return (
    <>
      <div className="w-full px-4 py-2 bg-background">
        <Swiper slidesPerView="auto" spaceBetween={8} className="w-full">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const className = cn(
              "relative flex flex-col items-center px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors",
              isActive ? "bg-primary text-primary-foreground" : " text-muted-foreground"
            );

            return (
              <SwiperSlide key={tab.key} className="!w-auto">
                {tab.path ? (
                  <Button asChild variant="ghost" className={className}>
                    <Link to={tab.path}>{tab.label}</Link>
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => setIsOverlayOpen(true)} className={className}>
                    {tab.label}
                  </Button>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <TreeOverlay open={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <ErrorBoundary fallbackRender={() => <TreeOverlay.ErrorFallback onClose={() => setIsOverlayOpen(false)} />}>
          <Suspense fallback={<TreeOverlay.Skeleton />}>
            <>
              <TreeOverlay.Header />
              <TreeOverlay.OnlyWhenLoggedIn>
                <TreeCanvas />
              </TreeOverlay.OnlyWhenLoggedIn>
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
