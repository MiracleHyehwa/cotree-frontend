import { BaseApiError } from "./baseApiError";
import { PaymentErorrCode, PaymentError } from "./paymentErrorCode";

export class PaymentApiError extends BaseApiError {
  constructor(code: PaymentErorrCode, status: number) {
    const { message } = PaymentError[code];
    super(code, message, status);
  }
}
