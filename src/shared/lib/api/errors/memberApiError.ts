import { BaseApiError } from "./baseApiError";
import { MemberError, MemberErrorCode } from "./memberErrorCode";

export class MemberApiError extends BaseApiError {
  constructor(code: MemberErrorCode, status: number) {
    const { message } = MemberError[code];
    super(code, message, status);
  }
}
