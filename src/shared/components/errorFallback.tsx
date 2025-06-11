import { Button } from "@/shared/components/ui/button";
import { HeaderHomeLayout } from "@/shared/layout";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl font-bold text-primary leading-none">500</div>

        <h1 className="mt-3 text-xl font-semibold text-foreground">문제가 발생했어요</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          예상하지 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={resetErrorBoundary} className="cursor-pointer">
            다시 시도
          </Button>
          <Button variant="outline" onClick={() => navigate("/")} className="cursor-pointer">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
