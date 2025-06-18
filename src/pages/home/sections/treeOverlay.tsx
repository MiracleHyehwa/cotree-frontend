import { ReactNode, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { useMyTreeSummary } from "@/entities/environment/api/hooks";
import { useNavigate } from "react-router-dom";

interface TreeOverlayProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function TreeOverlay({ open, onClose, children }: TreeOverlayProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-limit flex flex-col items-center gap-4">{children}</div>
      </div>
    </div>
  );
}

TreeOverlay.OnlyWhenLoggedIn = function OnlyWhenLoggedIn({ children }: { children: ReactNode }) {
  const { data } = useMyTreeSummary();

  if (!data?.isLoggedIn) return null;

  return <>{children}</>;
};

TreeOverlay.Header = function TreeOverlayHeader() {
  const { data } = useMyTreeSummary();
  const { ecoCount } = data;
  const navigate = useNavigate();

  if (!data?.isLoggedIn) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 text-center animate-fade-in-up">
        <div className="text-5xl mb-4">🌱</div>

        <p className="text-base text-primary-foreground leading-relaxed mb-6">
          로그인하면 내 나무의 성장을 확인할 수 있어요.
        </p>

        <Button variant="link" onClick={() => navigate("/login")} className="cursor-pointer">
          로그인하러 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-limit px-6 pt-10 pb-4 text-center animate-fade-in-up">
      <p className="text-base leading-relaxed text-primary-foreground break-words">
        이번 달에 <strong className="text-primary font-semibold">{ecoCount}건</strong>의 친환경 상품을 구매했어요.
      </p>
    </div>
  );
};

TreeOverlay.Footer = function TreeOverlayFooter({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: () => void;
}) {
  const { data } = useMyTreeSummary();
  const { isLoggedIn } = data;
  return (
    <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-6">
      {isLoggedIn && (
        <Button variant="default" className="w-full max-w-limit cursor-pointer" onClick={onNavigate}>
          내 실제 나무 보러가기
        </Button>
      )}
      <Button
        variant={isLoggedIn ? "outline" : "default"}
        className="w-full max-w-limit text-sm cursor-pointer"
        onClick={onClose}
      >
        닫기
      </Button>
    </div>
  );
};

TreeOverlay.Skeleton = function TreeOverlaySkeleton() {
  return (
    <div className="w-full text-center py-6 animate-pulse text-primary-foreground text-base">
      나무를 불러오는 중이에요...
    </div>
  );
};

TreeOverlay.ErrorFallback = function TreeOverlayErrorFallback({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <p className="text-destructive text-xl">"나무 정보를 불러오는 데 실패했어요</p>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-6">
        <Button variant="default" className="w-full max-w-limit text-sm cursor-pointer h-12" onClick={onClose}>
          닫기
        </Button>
      </div>
    </>
  );
};
