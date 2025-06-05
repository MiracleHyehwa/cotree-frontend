import { createContext } from "react";
import type { OrderStatusKey } from "../constants";

interface OrderHistoryContextValue {
  currentStatus: OrderStatusKey;
}

export const OrderHistoryContext = createContext<OrderHistoryContextValue | undefined>(undefined);
