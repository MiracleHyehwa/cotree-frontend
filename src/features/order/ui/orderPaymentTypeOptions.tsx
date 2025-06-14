import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";

interface OrderPaymentTypeOptionsProps {
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function OrderPaymentTypeOptions({ value, disabled = false, onChange }: OrderPaymentTypeOptionsProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} disabled={disabled} className="flex items-center gap-2">
      <RadioGroupItem value="general" id="general" disabled={disabled} />
      <Label htmlFor="general" className="text-base font-medium text-foreground">
        일반결제
      </Label>
    </RadioGroup>
  );
}
