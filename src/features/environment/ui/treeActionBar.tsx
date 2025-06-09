import { useEnvironmentContext } from "@/features/environment/hooks";
import { calculateExpPercent } from "@/features/environment/utils";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface TreeActionBarProps {
  children: (args: { visible: boolean; toggle: () => void }) => React.ReactNode;
}

export function TreeActionBar({ children }: TreeActionBarProps) {
  const [visible, setVisible] = useState(true);
  const toggle = () => setVisible((v) => !v);

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full z-40 transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "translate-y-[calc(100%-4rem)]"}
      `}
    >
      <div className="relative mx-auto max-w-limit rounded-t bg-background/90 backdrop-blur-md shadow-lg px-4 pt-4 pb-8 space-y-4">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-50">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full shadow bg-background cursor-pointer"
            onClick={toggle}
          >
            {visible ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </Button>
        </div>

        {children({ visible, toggle })}
      </div>
    </div>
  );
}

TreeActionBar.Level = function Level() {
  const { exp } = useEnvironmentContext();
  const level = Math.floor(exp / 1000) + 1;

  return <span className="font-semibold">레벨 {level} 자라나무</span>;
};

TreeActionBar.Progress = function Progress() {
  const { exp } = useEnvironmentContext();
  const percent = calculateExpPercent(exp);

  return (
    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden mt-1">
      <div className="h-full bg-ring transition-all" style={{ width: `${percent}%` }} />
    </div>
  );
};

TreeActionBar.Buttons = function Buttons({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  if (!visible) return null;

  return <div className="grid grid-cols-1 gap-3">{children}</div>;
};

TreeActionBar.GiveWater = function GiveWater() {
  const { isReady, increaseExp } = useEnvironmentContext();

  return (
    <Button onClick={() => increaseExp(100)} disabled={!isReady} variant="default" className="cursor-pointer">
      <span className="text-sm font-medium text-white">물 주기</span>
      <span className="text-xs text-foreground/70 mt-0.5">3개 남음</span>
    </Button>
  );
};
