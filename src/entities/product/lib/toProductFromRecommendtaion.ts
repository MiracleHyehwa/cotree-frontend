import { Product, RawRecommendation } from "../model";

export const toProductFromRecommendation = (raw: RawRecommendation): Product => ({
  id: raw.product_id,
  name: raw.name,
  price: raw.price,
  salePrice: raw.salePrice,
  discountRate: raw.discountRate,
  origin: raw.origin,
  thumbnailImage: raw.thumbnail_image,
  brandName: raw.brand,
  isGreen: raw.is_green === "Y" ? "Y" : "N",
  quantity: raw.quantity,
});
