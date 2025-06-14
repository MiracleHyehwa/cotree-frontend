import { BaseApiError } from "./baseApiError";
import { ValidationError, ValidationErrorCode } from "./validationErrorCode";

export class ValidationApiError extends BaseApiError {
  constructor(code: ValidationErrorCode, status: number) {
    const { message } = ValidationError[code];
    super(code, message, status);
  }
}
