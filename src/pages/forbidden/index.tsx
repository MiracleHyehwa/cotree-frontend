import { Button } from "@/shared/components/ui/button";
import { CommonLayout } from "@/shared/layout";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-destructive leading-none">403</div>

          <h1 className="mt-3 text-xl font-semibold text-foreground">접근이 거부되었습니다</h1>

          <p className="mt-2 text-sm text-muted-foreground">이 페이지에 접근할 수 있는 권한이 없습니다.</p>

          <div className="mt-6 flex justify-center gap-2">
            <Button onClick={() => navigate(-1)} className="cursor-pointer">
              이전 페이지
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="cursor-pointer">
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
