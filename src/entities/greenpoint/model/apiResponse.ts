export interface PointHistoryItem {
  id: number;
  amount: number;
  createdAt: string;
}

export type PointHistoryResponse = PointHistoryItem[];

export interface PointSummaryResponse {
  remainPoint: number;
  totalCount: number;
}
