import { Button } from "@/shared/components/ui/button";
import { OrderApiError, PaymentApiError } from "@/shared/lib/api/errors";
import { AlertTriangle } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

let hasShownPaymentError = false;

export default function OrderCompletedErrorFallback({ error }: { error: Error }) {
  const navigate = useNavigate();

  if (error instanceof OrderApiError && error.code === "OR003") {
    return <Navigate to="/not-found" replace />;
  }

  if (error instanceof PaymentApiError && error.code === "PA000") {
    if (!hasShownPaymentError) {
      hasShownPaymentError = true;

      toast.error("결제가 실패했습니다.", {
        position: "bottom-right",
        duration: 5000,
        action: {
          label: "주문서로 이동",
          onClick: () => navigate("/orders?status=PENDING"),
        },
      });
    }

    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center text-muted-foreground space-y-6">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">결제가 실패했습니다</h2>
          <p>주문이 완료되지 않았습니다. 다시 시도해 주세요.</p>
        </div>
        <Button size="lg" onClick={() => navigate("/orders?status=PENDING")} className="cursor-pointer">
          다시 주문하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center text-muted-foreground space-y-6">
      <AlertTriangle className="w-12 h-12 text-destructive" />
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">주문 정보를 불러오지 못했습니다</h2>
        <p>일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.</p>
      </div>
      <Button size="lg" onClick={() => location.reload()} className="cursor-pointer">
        다시 시도하기
      </Button>
    </div>
  );
}
