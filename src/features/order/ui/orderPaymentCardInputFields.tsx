import { useRef, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

export default function OrderPaymentCardInputFields() {
  const { setValue, control, formState } = useFormContext();
  const { errors } = formState;

  const [segments, setSegments] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleSegmentChange = (value: string, index: number) => {
    const newValue = value.replace(/\D/g, "").slice(0, 4);
    const newSegments = [...segments];
    newSegments[index] = newValue;
    setSegments(newSegments);

    setValue("cardNumber", newSegments.join(""));

    if (newValue.length === 4 && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label className="mb-1 block text-sm font-medium">카드 번호</Label>
        <div className="flex gap-2">
          {segments.map((val, i) => (
            <Input
              inputMode="numeric"
              key={i}
              ref={refs[i]}
              placeholder="****"
              maxLength={4}
              className="w-1/4 placeholder:text-muted-foreground/50 text-base"
              value={val}
              onChange={(e) => handleSegmentChange(e.target.value, i)}
            />
          ))}
        </div>
        {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber.message as string}</p>}
      </div>

      <div className="w-full">
        <Controller
          name="cardType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full max-w-limit">
                <SelectValue placeholder="은행을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shinhan">신한은행</SelectItem>
                <SelectItem value="kb">국민은행</SelectItem>
                <SelectItem value="hana">하나은행</SelectItem>
                <SelectItem value="woori">우리은행</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.cardType && <p className="text-sm text-destructive mt-1">{errors.cardType.message as string}</p>}
      </div>

      <div>
        <Controller
          name="installment"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full max-w-limit">
                <SelectValue placeholder="일시불" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">일시불</SelectItem>
                <SelectItem value="2">2개월</SelectItem>
                <SelectItem value="3">3개월</SelectItem>
                <SelectItem value="6">6개월</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.installment && <p className="text-sm text-destructive mt-1">{errors.installment.message as string}</p>}
      </div>
    </div>
  );
}
