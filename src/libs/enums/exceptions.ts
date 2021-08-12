export class BatchError extends Error {
  readonly code: string;
  details?: unknown;

  constructor(code: string, details?: unknown, message?: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BatchError);
    }

    this.name = 'BatchError';
    this.code = code;
    this.details = details;
    this.message = '';
  }

  public withDetails(details: unknown) {
    this.details = details;
    return this;
  }
}

const exceptions = Object.freeze({
  runtimeError: new BatchError('RUNTIME_ERROR'),
  validationError: new BatchError('VALIDATION_ERROR'),
});

export default exceptions;
