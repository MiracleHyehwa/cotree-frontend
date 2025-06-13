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
  subtitle: string;
  brand: { name: string };
  price: number;
  discount: number;
  points: string;
  isGreen?: string;
}

export interface ProductMeta {
  code: string;
  origin: string;
  delivery: {
    info: string;
  };
}

export interface ProductDetail extends ProductSummary, ProductMeta {
  id: number;
  images: string[];
  caution: string;
  details: {
    type: "text" | "image";
    content: string;
  }[];
}
