import { BaseApiError } from "./baseApiError";
import { PaymentErrorCode, PaymentError } from "./paymentErrorCode";

export class PaymentApiError extends BaseApiError {
  constructor(code: PaymentErrorCode, status: number) {
    const { message } = PaymentError[code];
    super(code, message, status);
  }
}
