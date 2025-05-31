export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  origin: string;
  image_url: string;
  brand: { name: string };
  is_green: string;
}
