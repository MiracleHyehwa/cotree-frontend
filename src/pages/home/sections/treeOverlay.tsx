import { ReactNode, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";

interface TreeOverlayProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface TreeOverlayHeaderProps {
  ecoCount: number;
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

TreeOverlay.Header = function TreeOverlayHeader({ ecoCount }: TreeOverlayHeaderProps) {
  return (
    <div className="w-full max-w-limit px-6 text-center mt-6 animate-fade-in-up">
      <p className="text-2xl text-primary-foreground">
        이번 달에 <strong className="text-primary">{ecoCount}건</strong>의 친환경 상품을 구매했어요.
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
  return (
    <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-6">
      <Button variant="default" className="w-full max-w-limit cursor-pointer" onClick={onNavigate}>
        내 실제 나무 보러가기
      </Button>

      <Button variant="outline" className="w-full max-w-limit text-sm cursor-pointer" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
};
