export type ErrorOptions = {
  cause?: unknown
}

export class ApiError extends Error {
  public response: Response

  constructor(message: string, response: Response, options: ErrorOptions = {}) {
    // @ts-ignore TS2554
    super(message, { cause: options.cause })
    this.response = response
  }
}
