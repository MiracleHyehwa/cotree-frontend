import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function AdminNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground">요청하신 관리자 페이지가 존재하지 않거나 경로가 잘못되었습니다.</p>
      </div>

      <Button variant="outline" onClick={() => navigate("/admin")} className="cursor-pointer">
        관리자 홈으로 돌아가기
      </Button>
    </div>
  );
}
