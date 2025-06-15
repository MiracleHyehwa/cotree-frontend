import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { GetSearchedProductsParams, ProductDetail, ProductListResponse } from "../model";

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
    const res = await api.get(`items/${id}`).json<ApiResponse<ProductDetail>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getSearchedProducts = async (
  { keyword, categoryId, isGreen, page }: GetSearchedProductsParams,
  displayMode: DisplayMode = "fallback"
): Promise<ProductListResponse> => {
  try {
    const searchParams: Record<string, string> = {
      keyword,
      page: String(page),
    };

    if (categoryId !== 0) {
      searchParams.categoryId = String(categoryId);
    }

    if (isGreen != null) {
      searchParams.isGreen = isGreen;
    }

    const res = await api.get("items/search", { searchParams }).json<ApiResponse<ProductListResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
