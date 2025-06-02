import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/components/ui/dialog";
import DaumPostcodeEmbed from "react-daum-postcode";
import { DaumPostcodeData } from "@/features/order/model/types/daumPostCode";

interface OrderShippingAddressPostcodeProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSelect: (address: string) => void;
}

export default function OrderShippingAddressPostcode({ open, setOpen, onSelect }: OrderShippingAddressPostcodeProps) {
  const handleComplete = (data: DaumPostcodeData) => {
    const extra = data.addressType === "R" ? [data.bname, data.buildingName].filter(Boolean).join(", ") : "";
    const full = extra ? `${data.address} (${extra})` : data.address;
    onSelect(full);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 w-full max-w-limit h-screen max-h-full bg-background flex flex-col rounded-none">
        <DialogTitle className="sr-only">주소 검색</DialogTitle>
        <DialogDescription className="sr-only">주소를 검색해 배송지로 등록하세요</DialogDescription>

        <div className="h-12 shrink-0 flex items-center justify-end px-4"></div>

        <div className="flex-1 overflow-hidden">
          <DaumPostcodeEmbed onComplete={handleComplete} style={{ width: "100%", height: "100%" }} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
