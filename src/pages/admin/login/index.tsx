import { AdminAuthForm } from "@/features/admin/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-col justify-between p-10 w-1/2 bg-primary/90 text-primary-foreground">
        <div className="text-lg font-bold">CoTree 관리자</div>
        <blockquote className="text-sm leading-relaxed mt-auto font-mono">CoTree 관리자 시스템</blockquote>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">관리자 로그인</h1>
            <p className="text-sm text-muted-foreground">아이디와 비밀번호를 입력하세요</p>
          </div>
          <AdminAuthForm />
        </div>
      </div>
    </div>
  );
}
