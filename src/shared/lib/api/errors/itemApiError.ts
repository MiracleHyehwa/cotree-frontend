import { BaseApiError } from "./baseApiError";
import { ItemError, ItemErrorCode } from "./itemErrorCode";

export class ItemApiError extends BaseApiError {
  constructor(code: ItemErrorCode, status: number) {
    const { message } = ItemError[code];
    super(code, message, status);
  }
}
