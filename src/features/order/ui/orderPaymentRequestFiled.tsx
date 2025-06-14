import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function OrderPaymentRequestField() {
  const { register } = useFormContext();

  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="request">요청사항</Label>
      <Textarea
        id="request"
        placeholder="배송 시 요청사항을 입력하세요 (예: 부재 시 문 앞에 놓아주세요)"
        className="placeholder:text-sm"
        {...register("request")}
      />
    </div>
  );
}
