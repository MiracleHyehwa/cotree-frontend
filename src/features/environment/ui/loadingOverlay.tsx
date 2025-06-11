import { useEnvironmentContext } from "@/features/environment/hooks";
import { useDelayedUnmount } from "../hooks/useDelayedUnmount";

interface LoadingOverlayRootProps {
  children: React.ReactNode;
}

function LoadingOverlay({ children }: LoadingOverlayRootProps) {
  return <div className="relative w-full h-full">{children}</div>;
}

LoadingOverlay.WhenLoading = function WhenLoading({ children }: { children: React.ReactNode }) {
  const { isReady } = useEnvironmentContext();
  const showOverlay = useDelayedUnmount(!isReady, 200);

  if (!showOverlay) return null;

  return (
    <div className="w-full max-w-limit mx-auto fixed inset-0 z-50 bg-background/30 backdrop-blur-xs flex items-center justify-center transition-opacity duration-700">
      {children}
    </div>
  );
};

LoadingOverlay.Loading = function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      <div className="text-lg font-medium text-foreground/70 tracking-wide">나무를 가져오고 있어요.</div>
    </div>
  );
};

export default LoadingOverlay;
