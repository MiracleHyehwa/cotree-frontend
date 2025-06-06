import { useRef, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function OrderRecipientFields() {
  const { setValue, register, formState } = useFormContext();
  const { errors } = formState;

  const [segments, setSegments] = useState(["", "", ""]);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleSegmentChange = (value: string, index: number) => {
    const sanitized = value.replace(/\D/g, "").slice(0, index === 0 ? 3 : 4);
    const updated = [...segments];
    updated[index] = sanitized;
    setSegments(updated);

    const fullNumber = updated.join("");
    setValue("recipientPhone", fullNumber);

    if (sanitized.length === (index === 0 ? 3 : 4) && index < 2) {
      refs[index + 1].current?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">받는 사람 정보</h2>

      <div className="space-y-2">
        <div>
          <Label htmlFor="recipientName" className="block text-sm font-medium mb-1">
            이름
          </Label>
          <Input
            id="recipientName"
            {...register("recipientName")}
            placeholder="홍길동"
            className="w-full placeholder:text-muted-foreground/50"
          />
          {errors.recipientName && (
            <p className="text-sm text-destructive mt-1">{errors.recipientName.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="recipientPhone" className="block text-sm font-medium mb-1">
            전화번호
          </Label>
          <div className="flex gap-2">
            {segments.map((val, i) => (
              <Input
                key={i}
                inputMode="numeric"
                placeholder={i === 0 ? "010" : "1234"}
                maxLength={i === 0 ? 3 : 4}
                className="w-1/3 placeholder:text-muted-foreground/50"
                value={val}
                ref={refs[i]}
                onChange={(e) => handleSegmentChange(e.target.value, i)}
              />
            ))}
          </div>
          {errors.recipientPhone && (
            <p className="text-sm text-destructive mt-1">{errors.recipientPhone.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
}
