export interface CartItem {
  basketItemId: number;
  itemId: number;
  itemName: string;
  brandName: string;
  price: number;
  discount: number;
  quantity: number;
  thumbnailImage: string;
  isGreen: "Y" | "N";
}
