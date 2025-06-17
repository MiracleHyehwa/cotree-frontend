import { Button } from "@/shared/components/ui/button";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { useFormContext } from "react-hook-form";

interface OrderPaymentActionBarProps {
  totalAmount: number;
  disabled?: boolean;
  onClick?: () => void;
}

export default function OrderPaymentActionBar({ totalAmount, disabled = false, onClick }: OrderPaymentActionBarProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-20">
      <div className="max-w-limit mx-auto px-4 py-4">
        <Button
          type="submit"
          className="w-full text-base font-bold h-12 cursor-pointer"
          disabled={disabled || isSubmitting}
          onClick={onClick}
        >
          {isSubmitting ? (
            <SpinnerIcon className="border-muted border-t-primary" />
          ) : (
            `${totalAmount.toLocaleString()}원 결제하기`
          )}
        </Button>
      </div>
    </div>
  );
}
