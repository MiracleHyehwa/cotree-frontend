import { Button } from "@/shared/components/ui/button";
import { LoginLayout } from "@/shared/layout";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const handleLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao?redirect=${encodeURIComponent(
      redirectTo
    )}`;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LoginLayout>
      <div className="flex w-full flex-1 flex-col items-stretch justify-start gap-8 overflow-x-hidden bg-background px-4 pb-10 pt-8">
        <div className="z-10 flex flex-1 flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-1">
            <img
              src="/logo.png"
              alt="cotree 로고"
              className="w-48 h-48 object-contain drop-shadow-lg select-none pointer-events-none"
            />
            <h1 className="text-2xl font-bold text-foreground mb-2">환영합니다!</h1>
            <p className="text-muted-foreground text-center leading-relaxed">간편하게 로그인하고 이용해보세요</p>
          </div>
        </div>

        <div className="flex w-full flex-col pt-8">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <div className="flex w-full flex-col items-center justify-center">
                <Button
                  className="relative w-full h-12 flex items-center justify-center p-4 border border-transparent text-base font-bold rounded-md text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500]"
                  size="lg"
                  onClick={handleLogin}
                >
                  <img src="/kakao-icon.svg" alt="카카오 로고" className="w-6 h-56mr-2" width={20} height={20} />
                  카카오로 로그인하기
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <Button
                className="w-full h-12 px-4 py-3 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
                size="lg"
              >
                게스트 계정으로 로그인하기
              </Button>
            </div>
          </div>

          <div className="flex h-full w-full flex-row items-center justify-center gap-3 pt-5 text-muted-foreground">
            <Button
              onClick={handleCancel}
              className="text-sm text-foreground cursor-pointer underline"
              variant={"link"}
            >
              나중에 하기
            </Button>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
