import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EnvironmentLayoutProps {
  children: React.ReactNode;
}
export default function EnvironmentLayout({ children }: EnvironmentLayoutProps) {
  const navigate = useNavigate();

  return (
    <div id="main-container" className="flex w-full flex-col items-center justify-start h-screen overflow-hidden">
      <header id="main-header" className="relative top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-limit flex-row items-center justify-between gap-4 transition-colors bg-background">
          <div className="absolute bottom-0 left-3 top-7 flex flex-row items-center justify-center">
            <Button onClick={() => navigate(-1)} className="w-8 h-8 p-2 cursor-pointer" variant={"link"}>
              <span className="sr-only">뒤로가기</span>
              <ArrowLeft className="!w-6 !h-6 text-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start relative overflow-y-hidden"
      >
        {children}
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-black" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-background max-w-limit" />
      </div>
    </div>
  );
}
