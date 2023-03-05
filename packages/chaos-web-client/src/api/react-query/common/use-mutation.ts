'use client'
import {
  useMutation as useBaseMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

import { useDefaultErrorHandler } from './error-handler'

export type {
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const errorHandler = useDefaultErrorHandler()
  return useBaseMutation({
    onError: errorHandler,
    ...options,
  })
}
