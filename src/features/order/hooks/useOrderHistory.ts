import { useContext } from "react";
import { OrderHistoryContext } from "../context";

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) throw new Error("useOrderHistory must be used within OrderHistoryProvider");
  return context;
};
