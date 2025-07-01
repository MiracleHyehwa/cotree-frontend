import { useEffect } from "react";
import { toast } from "sonner";

const TOAST_ID = "special-deal-toast";

export default function EventToast() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast("🔥 특가 할인 이벤트 진행 중!", {
        duration: 3600000,
        position: "top-center",
        id: TOAST_ID,
        action: {
          label: "닫기",
          onClick: () => {
            toast.dismiss(TOAST_ID);
          },
        },
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
      toast.dismiss(TOAST_ID);
    };
  }, []);

  return null;
}
