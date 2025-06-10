export abstract class BaseApiError extends Error {
  constructor(public readonly code: string, public readonly message: string, public readonly status: number) {
    super(message);
    this.name = this.constructor.name;
  }
}
