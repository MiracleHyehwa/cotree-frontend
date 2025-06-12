import { BaseApiError } from "./baseApiError";
import { GreenPointError, GreenPointErrorCode } from "./greenPointErrorCode";

export class GreenPointApiError extends BaseApiError {
  constructor(code: GreenPointErrorCode, status: number) {
    const { message } = GreenPointError[code];
    super(code, message, status);
  }
}
