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
