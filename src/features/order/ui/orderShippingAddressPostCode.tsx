import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/components/ui/dialog";
import DaumPostcodeEmbed from "react-daum-postcode";

interface OrderShippingAddressPostcodeProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSelect: (address: string) => void;
}

export default function OrderShippingAddressPostcode({ open, setOpen, onSelect }: OrderShippingAddressPostcodeProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 w-full max-w-limit h-screen max-h-full border-0 bg-background flex flex-col">
        <DialogTitle className="sr-only">주소 검색</DialogTitle>
        <DialogDescription className="sr-only">주소를 검색해 배송지로 등록하세요</DialogDescription>

        <div className="h-12 shrink-0 flex items-center justify-end px-4"></div>

        <div className="flex-1 overflow-hidden">
          <DaumPostcodeEmbed
            onComplete={(data: any) => {
              const extra = data.addressType === "R" ? [data.bname, data.buildingName].filter(Boolean).join(", ") : "";
              const full = extra ? `${data.address} (${extra})` : data.address;
              onSelect(full);
              setOpen(false);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
