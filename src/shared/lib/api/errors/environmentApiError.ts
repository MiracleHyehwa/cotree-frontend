import { BaseApiError } from "./baseApiError";
import { EnvironmentError, EnvironmentErrorCode } from "./environmentErrorCode";

export class EnvironmentApiError extends BaseApiError {
  constructor(code: EnvironmentErrorCode, status: number) {
    const { message } = EnvironmentError[code];
    super(code, message, status);
  }
}
