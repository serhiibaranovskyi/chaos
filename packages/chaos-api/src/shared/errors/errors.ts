export type BaseErrorOptions = {
  cause?: unknown
}

export class BaseError extends Error {
  public static DEFAULT_MESSAGE = ''

  constructor(
    message = BaseError.DEFAULT_MESSAGE,
    options: BaseErrorOptions = {}
  ) {
    // @ts-ignore TS2554
    super(message, { cause: options.cause })
  }
}

export class DBError extends BaseError {
  public static DEFAULT_MESSAGE = 'DB Error'

  constructor(
    message: string = DBError.DEFAULT_MESSAGE,
    options: BaseErrorOptions = {}
  ) {
    super(message, options)
  }
}

export class NotFoundError extends BaseError {
  public static DEFAULT_MESSAGE = 'Not Found'

  constructor(
    message: string = NotFoundError.DEFAULT_MESSAGE,
    options: BaseErrorOptions = {}
  ) {
    super(message, options)
  }
}
