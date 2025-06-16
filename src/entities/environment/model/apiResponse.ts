export interface TreeStatus {
  exp: number;
  remainingWaterUnit: number;
}

export type MyTreeResponse = TreeStatus;
export type GiveWaterResponse = TreeStatus;

export interface MyTreeSummaryResponse {
  exp: number;
  ecoCount: number;
}
