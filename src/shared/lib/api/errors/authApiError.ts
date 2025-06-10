import { BaseApiError } from "./baseApiError";
import { AuthError, AuthErrorCode } from "./auhErrorCode";

export class AuthApiError extends BaseApiError {
  constructor(code: AuthErrorCode, status: number) {
    const { message } = AuthError[code];
    super(code, message, status);
  }
}
