import { BaseApiError } from "./baseApiError";
import { OrderError, OrderErrorCode } from "./orderErrorCode";

export class OrderApiError extends BaseApiError {
  constructor(code: OrderErrorCode, status: number) {
    const { message } = OrderError[code];
    super(code, message, status);
  }
}
