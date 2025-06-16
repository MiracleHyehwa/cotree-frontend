import { BaseApiError } from "./baseApiError";
import { AdminError, AdminErrorCode } from "./adminErrorCode";

export class AdminApiError extends BaseApiError {
  constructor(code: AdminErrorCode, status: number) {
    const { message } = AdminError[code];
    super(code, message, status);
  }
}
