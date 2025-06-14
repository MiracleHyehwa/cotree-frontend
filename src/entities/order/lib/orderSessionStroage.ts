import { OrderItem } from "../model";

const ORDER_SESSION_KEY = "COTREE_ORDER_SESSION";

export const setOrderSession = (items: OrderItem[]) => {
  sessionStorage.setItem(ORDER_SESSION_KEY, JSON.stringify(items));
};

export const getOrderSession = (): OrderItem[] => {
  const raw = sessionStorage.getItem(ORDER_SESSION_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as OrderItem[];
  } catch {
    return [];
  }
};

export const clearOrderSession = () => {
  sessionStorage.removeItem(ORDER_SESSION_KEY);
};

export const shouldRedirectOrderPage = (): boolean => {
  const items = getOrderSession();
  return items.length === 0;
};
