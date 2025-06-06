import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

interface OrderAgreementConfirmationCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function OrderAgreementConfirmationCheckbox({
  checked,
  onChange,
}: OrderAgreementConfirmationCheckboxProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">주문 정보 확인</h2>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" checked={checked} onCheckedChange={(value) => onChange(!!value)} />
        <Label htmlFor="agree" className="text-sm text-muted-foreground">
          주문 내용을 확인하였으며, 결제에 동의합니다.
        </Label>
      </div>
    </div>
  );
}
