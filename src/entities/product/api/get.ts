import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { ProductDetail, ProductDetailItem, ProductListResponse, RawProductDetail } from "../model";

export const getProductsByCategory = async (
  categoryId: string,
  page = 1,
  displayMode: DisplayMode = "fallback"
): Promise<ProductListResponse> => {
  try {
    const res = await api
      .get("items", { searchParams: { categoryId: categoryId, page } })
      .json<ApiResponse<ProductListResponse>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getEcoProducts = async (displayMode: DisplayMode = "fallback"): Promise<ProductListResponse> => {
  try {
    const res = await api.get("items/eco?page=1").json<ApiResponse<ProductListResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getEcoProductByPage = async (
  page = 1,
  displayMode: DisplayMode = "fallback"
): Promise<ProductListResponse> => {
  try {
    const res = await api.get(`items/eco?page=${page}`).json<ApiResponse<ProductListResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getProductDetail = async (id: string, displayMode: DisplayMode = "fallback") => {
  try {
    const res = await api.get(`items/${id}`).json<ApiResponse<RawProductDetail>>();
    const raw = res.data;

    const parsedDescription = (JSON.parse(raw.description) as Array<{ text?: string; image?: string }>).map((item) => {
      if (item.text) {
        return { type: "text", content: item.text } as ProductDetailItem;
      }
      if (item.image) {
        return { type: "image", content: item.image } as ProductDetailItem;
      }
      throw new Error("Invalid item format in product description");
    });

    return {
      ...raw,
      description: parsedDescription,
    } satisfies ProductDetail;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
