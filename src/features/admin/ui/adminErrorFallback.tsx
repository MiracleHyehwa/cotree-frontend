import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function AdminErrorFallback() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-semibold">오류가 발생했습니다</h1>
        <p className="text-sm text-muted-foreground">
          데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      </div>

      <Button variant="outline" onClick={() => navigate("/admin")} className="cursor-pointer">
        관리자 홈으로
      </Button>
    </div>
  );
}
