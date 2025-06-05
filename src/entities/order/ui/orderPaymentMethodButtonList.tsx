import { Button } from "@/shared/components/ui/button";

interface PaymentMethod {
  label: string;
  disabled: boolean;
  selected?: boolean;
}

interface OrderPaymentMethodButtonListProps {
  methods: PaymentMethod[];
}

export default function OrderPaymentMethodButtonList({ methods }: OrderPaymentMethodButtonListProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {methods.map(({ label, disabled, selected }) => (
        <Button
          key={label}
          disabled={disabled}
          className={`text-sm rounded-md px-3 py-2 cursor-pointer
            ${selected ? "bg-primary text-white font-semibold" : "bg-muted text-muted-foreground"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
