export interface TreeStatus {
  exp: number;
  remainingWaterUnit: number;
}

export type MyTreeResponse = TreeStatus;
export type GiveWaterResponse = TreeStatus;
