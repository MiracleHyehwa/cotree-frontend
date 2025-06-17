export interface PointStatResponse {
  statDate: string;
  used: number;
  rewarded: number;
}

export interface InsightOverviewResponse {
  totalRevenue: number;
  newUserCount: number;
  totalOrderCount: number;
  ecoProductRate: number;
}

export interface EcoPopularItem {
  itemId: number;
  itemName: string;
  purchaseCount: number;
}

export type EcoPopularItemResponse = EcoPopularItem[];

export interface PurchaseCategoryStat {
  categoryName: string;
  ecoItemPurchaseCount: number;
  normalItemPurchaseCount: number;
}

export type PurchaseCategoryStatResponse = PurchaseCategoryStat[];

export interface PurchaseCount {
  count: number;
  itemClassification: "GENERAL" | "ECO";
}

export type PurchaseCountResponse = PurchaseCount[];

export interface PurchaseGender {
  gender: string;
  count: number;
}

export type PurchaseGenderResponse = PurchaseGender[];

export interface PurchaseAge {
  count: number;
  memberAge: "10s" | "20s" | "30s" | "40s" | "50s" | "60s";
}

export type PurchaseAgeResponse = PurchaseAge[];
