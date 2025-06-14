export interface OrderItem {
  itemId: number;
  itemName: string;
  brandName: string;
  quantity: number;
  price: number;
  finalPrice: number;
  isGreen: "Y" | "N";
  thumbnailImage: string;
}
