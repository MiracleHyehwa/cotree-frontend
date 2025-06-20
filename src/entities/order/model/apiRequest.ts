export interface OrderRequest {
  receiverName: string;
  receiverTel: string;
  destination: string;
  cardNumber: string;
  bankName: string;
  orderItems: {
    itemId: number;
    quantity: number;
  }[];
  request?: string;
}

export interface RetryOrderPaymentRequest {
  bank: string;
  orderNumber: string;
  cardNumber: string;
}
