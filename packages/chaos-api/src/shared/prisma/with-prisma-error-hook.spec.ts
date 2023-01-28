import { it, describe, expect } from '@jest/globals'
import { Prisma } from '@prisma/client'

import { DBError, NotFoundError } from '@/shared/errors'

import { withPrismaErrorHook } from './with-prisma-error-hook'

class CustomError extends Error {}

class ServiceStub {
  @withPrismaErrorHook()
  public throwClientKnownRequestError() {
    throw new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2025',
      clientVersion: '',
    })
  }

  @withPrismaErrorHook()
  public async throwClientUnknownRequestError() {
    throw new Prisma.PrismaClientUnknownRequestError('', { clientVersion: '' })
  }

  @withPrismaErrorHook()
  public async throwClientInitializationError() {
    throw new Prisma.PrismaClientInitializationError('', '')
  }

  @withPrismaErrorHook()
  public async throwClientValidationError() {
    throw new Prisma.PrismaClientValidationError()
  }

  @withPrismaErrorHook()
  public async throwCustomError() {
    throw new CustomError()
  }

  @withPrismaErrorHook()
  public async withoutError() {
    return 42
  }
}

describe('withPrismaErrorHook', () => {
  const serviceStub = new ServiceStub()

  it('Should throw the correct custom error', async () => {
    await expect(
      serviceStub.throwClientKnownRequestError
    ).rejects.toBeInstanceOf(NotFoundError)
    await expect(
      serviceStub.throwClientUnknownRequestError
    ).rejects.toBeInstanceOf(DBError)
    await expect(
      serviceStub.throwClientInitializationError
    ).rejects.toBeInstanceOf(DBError)
    await expect(serviceStub.throwClientValidationError).rejects.toBeInstanceOf(
      DBError
    )
  })

  it('Should throw the original error', async () => {
    await expect(serviceStub.throwCustomError()).rejects.toBeInstanceOf(
      CustomError
    )
  })

  it('Should return the original result', async () => {
    await expect(serviceStub.withoutError()).resolves.toBe(42)
  })
})
