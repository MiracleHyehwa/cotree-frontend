import { OrderListItem } from "@/entities/order/model";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { FormProvider, useForm } from "react-hook-form";
import RetryPaymentCardInputFields from "./retryPaymentCardInputFields";
import { RetryPaymentFormValues, retryPaymentSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRetryOrderPayment } from "@/entities/order/api/hooks";
import { useNavigate } from "react-router-dom";
import { SpinnerIcon } from "@/shared/components/ui/spinner";

interface PaymentFailRetryPaymentBottomSheetProps {
  open: boolean;
  onClose: () => void;
  order: OrderListItem | null;
}

export default function PaymentFailRetryPaymentBottomSheet({
  open,
  onClose,
  order,
}: PaymentFailRetryPaymentBottomSheetProps) {
  const form = useForm<RetryPaymentFormValues>({
    resolver: zodResolver(retryPaymentSchema),
    defaultValues: {
      cardNumber: "",
      bank: "",
    },
  });
  const { mutate: retryPayment, isPending } = useRetryOrderPayment();
  const navigate = useNavigate();
  const { handleSubmit } = form;

  const onSubmit = ({ cardNumber, bank }: RetryPaymentFormValues) => {
    if (!order) return;

    const payload = {
      orderNumber: order.orderNumber,
      cardNumber,
      bank,
    };

    retryPayment(payload, {
      onSuccess: () => {
        navigate(`/order/completed/${order.orderNumber}`, {
          state: { from: "order-success" },
        });
      },
    });
  };
  if (!order) return null;

  return (
    <FormProvider {...form}>
      <Drawer open={open} onClose={onClose}>
        <DrawerContent className="max-w-limit w-full mx-auto">
          <DrawerHeader>
            <DrawerTitle className="sr-only">결제정보 수정</DrawerTitle>
            <DrawerDescription className="sr-only">결제 정보를 입력해주세요</DrawerDescription>

            <div className="space-y-4">
              {order.orderItemResponses.map((item) => (
                <div key={item.itemId} className="flex gap-4">
                  <img src={item.itemThumbnailImage} className="w-16 h-16 rounded-md object-cover" />
                  <div className="text-sm">
                    <div className="font-medium">{item.itemName}</div>
                    <div className="text-muted-foreground">
                      {(item.price - item.discount).toLocaleString()}원 / {item.quantity}개
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <RetryPaymentCardInputFields />
          </DrawerHeader>

          <DrawerFooter className="pt-2">
            <Button variant="default" onClick={handleSubmit(onSubmit)} className="cursor-pointer">
              {isPending ? <SpinnerIcon className="border-muted border-t-primary" /> : "결제하기"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  );
}
