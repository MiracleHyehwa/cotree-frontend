import { ReactNode } from "react";
import type { OrderStatusKey } from "../constants";
import { useOrderHistory } from "../hooks";

interface OrderStatusContentProps {
  children: ReactNode;
}

interface WhenProps {
  status: OrderStatusKey;
  children: ReactNode;
}

function When({ status, children }: WhenProps) {
  const { currentStatus } = useOrderHistory();
  return currentStatus === status ? <>{children}</> : null;
}

export default function OrderStatusContent({ children }: OrderStatusContentProps) {
  return <>{children}</>;
}

OrderStatusContent.When = When;
