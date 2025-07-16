import { useEffect } from "react";
import { toast } from "sonner";

const TOAST_ID = "special-deal-toast";
const DISMISSED_KEY = "dismissed-special-toast";

function isAllowedTime() {
  const hour = new Date().getHours();
  return hour === 19 || hour === 20;
}

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

export default function EventToast() {
  useEffect(() => {
    const today = getTodayDateString();
    const dismissedDate = localStorage.getItem(DISMISSED_KEY);

    if (dismissedDate === today || !isAllowedTime()) return;

    const timeout = setTimeout(() => {
      toast("🔥 특가 할인 이벤트 진행 중!", {
        duration: 3600000,
        position: "top-center",
        id: TOAST_ID,
        action: {
          label: "닫기",
          onClick: () => {
            localStorage.setItem(DISMISSED_KEY, today);
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
