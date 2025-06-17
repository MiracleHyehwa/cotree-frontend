export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  discountRate: number;
  origin: string;
  thumbnailImage: string;
  brandName: string;
  isGreen: "Y" | "N";
  quantity: number;
}

export type ProductListResponse = Product[];

export interface ProductSummary {
  name: string;
  price: number;
  brandName: string;
  discountRate: number;
  salePrice: number;
  isGreen: "Y" | "N";
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  discountRate: number;
  origin: string;
  thumbnailImage: string;
  brandName: string;
  isGreen: "Y" | "N";
  quantity: number;
  description: string;
}

export interface RawRecommendation {
  product_id: number;
  name: string;
  price: number;
  salePrice: number;
  discountRate: number;
  origin: string;
  thumbnail_image: string;
  brand: string;
  is_green: string;
  quantity: number;
}
