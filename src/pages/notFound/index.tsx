import { Button } from "@/shared/components/ui/button";
import { HeaderHomeLayout } from "@/shared/layout";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <HeaderHomeLayout>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary leading-none">404</div>

          <h1 className="mt-3 text-xl font-semibold text-foreground">페이지를 찾을 수 없어요</h1>

          <p className="mt-2 text-sm text-muted-foreground">요청하신 페이지가 존재하지 않아요</p>

          <Button asChild className="mt-6">
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </HeaderHomeLayout>
  );
}
