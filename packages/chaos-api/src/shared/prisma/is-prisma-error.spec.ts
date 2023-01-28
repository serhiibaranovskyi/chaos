import { it, describe, expect } from '@jest/globals'
import { Prisma } from '@prisma/client'

import { BaseError } from '@/shared/errors'

import { isPrismaError } from './is-prisma-error'

class CustomError extends Error {}

describe('isPrismaError', () => {
  it('Should return true', async () => {
    const errParams = ['', { code: '', clientVersion: '' }] as const
    expect(
      isPrismaError(new Prisma.PrismaClientKnownRequestError(...errParams))
    ).toBeTruthy()
    expect(
      isPrismaError(new Prisma.PrismaClientUnknownRequestError(...errParams))
    ).toBeTruthy()
    expect(
      isPrismaError(new Prisma.PrismaClientInitializationError('', ''))
    ).toBeTruthy()
    expect(isPrismaError(new Prisma.PrismaClientValidationError())).toBeTruthy()
  })

  it('Should return false', async () => {
    expect(isPrismaError(new BaseError())).toBeFalsy()
    expect(isPrismaError(new CustomError())).toBeFalsy()
  })
})
