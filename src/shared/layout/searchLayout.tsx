import { Search } from "lucide-react";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { BottomNavigation } from "@/shared/layout";

interface SearchLayoutProps {
  children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim();

  const hasKeyword = !!keyword;

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <div className="fixed inset-0 flex flex-col items-center justify-start overflow-y-auto z-30 overscroll-none">
        <div className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start pt-[52px] pb-safe-bottom pb-16">
          {hasKeyword && (
            <div className="sticky top-[52px] z-10 backdrop-blur-xl bg-background border-b border-border">
              <div className="flex w-full max-w-limit h-[56px] items-center px-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-foreground">검색 결과</p>
                    <p className="text-xs text-muted-foreground">"{keyword}"에 대한 결과</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
      {hasKeyword && <BottomNavigation />}
      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-limit" />
      </div>
    </div>
  );
}
