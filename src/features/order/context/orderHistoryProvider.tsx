import { useSearchParams } from "react-router-dom";
import { OrderHistoryContext } from "./orderHistoryContext";
import type { OrderStatusKey } from "../constants";

const VALID_KEYS: OrderStatusKey[] = ["ALL", "PAID", "DELIVERED"];

export default function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const raw = searchParams.get("status")?.toUpperCase() ?? "ALL";

  const currentStatus = VALID_KEYS.includes(raw as OrderStatusKey) ? (raw as OrderStatusKey) : "ALL";

  return <OrderHistoryContext.Provider value={{ currentStatus }}>{children}</OrderHistoryContext.Provider>;
}
