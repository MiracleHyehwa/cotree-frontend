export interface GetSearchedProductsParams {
  keyword: string;
  categoryId: number;
  isGreen: "Y" | "N" | null;
  page: number;
}
