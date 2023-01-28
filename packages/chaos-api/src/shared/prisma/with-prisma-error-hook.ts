import { BaseError, DBError, NotFoundError } from '@/shared/errors'

import { isPrismaError } from './is-prisma-error'

// All errors codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
const PrismaErrorsMapping: Record<string, typeof BaseError> = {
  P2025: NotFoundError,
}

export function withPrismaErrorHook() {
  return (
    _: unknown,
    memberName: string,
    propDescriptor: PropertyDescriptor
  ) => {
    return {
      get() {
        const wrapperFn = async (...args: unknown[]) => {
          try {
            return await propDescriptor.value.apply(this, args)
          } catch (error) {
            if (isPrismaError(error)) {
              const CustomError =
                PrismaErrorsMapping['code' in error ? error.code : ''] ??
                DBError
              throw new CustomError(error.message, { cause: error })
            }
            throw error
          }
        }

        Object.defineProperty(this, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        })
        return wrapperFn
      },
    }
  }
}
