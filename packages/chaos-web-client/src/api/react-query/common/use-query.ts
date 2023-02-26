'use client'
import {
  QueryKey,
  useQuery as useBaseQuery,
  UseQueryOptions,
  UseQueryResult as UseBaseQueryResult,
} from '@tanstack/react-query'

import { useDefaultErrorHandler } from './error-handler'

export type { UseQueryOptions, QueryKey } from '@tanstack/react-query'

export type UseQueryResult<
  TData = unknown,
  TError = unknown
> = UseBaseQueryResult<TData, TError> & {
  response: TData | undefined
}

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const errorHandler = useDefaultErrorHandler()
  const result = useBaseQuery({
    onError: errorHandler,
    ...options,
  }) as UseQueryResult<TData, TError>

  result.response = result.data
  return result
}
