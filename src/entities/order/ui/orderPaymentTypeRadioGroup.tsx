import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";

interface OrderPaymentTypeRadioGroupProps {
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function OrderPaymentTypeRadioGroup({
  value,
  disabled = false,
  onChange,
}: OrderPaymentTypeRadioGroupProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} disabled={disabled} className="flex items-center gap-2">
      <RadioGroupItem value="general" id="general" disabled={disabled} />
      <Label htmlFor="general" className="text-base font-medium text-foreground">
        일반결제
      </Label>
    </RadioGroup>
  );
}
