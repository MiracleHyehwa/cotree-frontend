import { BaseApiError } from "./baseApiError";
import { CartError, CartErrorCode } from "./cartErrorCode";

export class CartApiError extends BaseApiError {
  constructor(code: CartErrorCode, status: number) {
    const { message } = CartError[code];
    super(code, message, status);
  }
}
