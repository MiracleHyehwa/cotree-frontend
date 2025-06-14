import { ReactNode, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useFormContext } from "react-hook-form";

interface Props {
  children: (props: { open: boolean; setOpen: (v: boolean) => void; onSelect: (addr: string) => void }) => ReactNode;
}

export default function OrderShippingAddressField({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const { setValue, formState } = useFormContext();
  const error = formState.errors.destination?.message as string | undefined;

  const handleSelect = (addr: string) => {
    setAddress(addr);
    setValue("destination", addr);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">배송지 정보</h2>
          <Button size="sm" variant="ghost" className="cursor-pointer" onClick={() => setOpen(true)}>
            {address ? "변경" : "등록"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {address ?? "배송지 정보가 없습니다. 배송지를 먼저 등록해주세요."}
        </p>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {children({ open, setOpen, onSelect: handleSelect })}
    </>
  );
}
