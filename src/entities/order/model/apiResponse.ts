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
}
