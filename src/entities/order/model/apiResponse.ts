export interface OrderListItem {
  orderId: number;
  orderDate: string;
  orderNumber: string;
  orderItemResponses: OrderListItemProduct[];
}

export interface OrderListItemProduct {
  itemId: number;
  itemName: string;
  itemThumbnailImage: string;
  isGreen: "Y" | "N";
  price: number;
  quantity: number;
  discount: number;
}

export interface OrderDetail {
  orderId: number;
  orderNumber: string;
  destination: string;
  receiverName: string;
  receiverTel: string;
  request: string;
  status: "PAID" | "PENDING";
  totalPrice: number;
  rewardGreenPoint: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  itemId: number;
  itemName: string;
  itemThumbnailImage: string;
  isGreen: "Y" | "N";
  price: number;
  discount: number;
  quantity: number;
}
