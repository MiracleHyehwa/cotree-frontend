import { CartItem } from "@/entities/cart/model";
import { OrderItem } from "../model";
import { ProductDetail } from "@/entities/product/model";

export const toOrderItemFromCart = (item: CartItem): OrderItem => {
  return {
    itemId: item.itemId,
    itemName: item.itemName,
    brandName: item.brandName,
    quantity: item.quantity,
    price: item.price,
    finalPrice: item.price - item.discount,
    isGreen: item.isGreen,
    thumbnailImage: item.thumbnailImage,
  };
};

export function toOrderItemFromProductDetail(product: ProductDetail, quantity: number): OrderItem {
  return {
    itemId: product.id,
    itemName: product.name,
    brandName: product.brandName,
    quantity,
    price: product.price,
    finalPrice: product.salePrice,
    isGreen: product.isGreen,
    thumbnailImage: product.thumbnailImage,
  };
}
