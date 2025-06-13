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

export interface ProductMeta {
  code: string;
  origin: string;
  delivery: {
    info: string;
  };
}

export type ProductDetailItem = { type: "text"; content: string } | { type: "image"; content: string };

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
  description: ProductDetailItem[];
}

export interface RawProductDetail extends Omit<ProductDetail, "description"> {
  description: string;
}
