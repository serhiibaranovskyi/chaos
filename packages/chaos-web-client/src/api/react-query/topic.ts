'use client'
import { useQueryClient } from '@tanstack/react-query'

import type { ChaosResponse, EntityId } from '@/api/core/common'
import {
  createTopic,
  CreateTopicDto,
  deleteTopic,
  fetchTopic,
  searchTopics,
  Topic,
  updateTopic,
  UpdateTopicDto,
} from '@/api/core/topic'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from './common'

export function getTopicsQK() {
  return ['topics'] as const
}

export function getTopicQK(id: EntityId) {
  return ['topics', id] as const
}

export function useCreateTopic<TError = unknown>(
  options: UseMutationOptions<ChaosResponse<Topic>, TError, CreateTopicDto> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTopic,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getTopicQK(response.data.id), response.data)
    },
  })
}

export function useTopic<TError = unknown>(
  id: EntityId,
  options: UseQueryOptions<ChaosResponse<Topic>, TError> = {}
) {
  return useQuery({
    queryKey: getTopicQK(id),
    queryFn: () => fetchTopic(id),
    ...options,
  })
}

export function useTopicsSearch<TError = unknown>(
  options: UseQueryOptions<ChaosResponse<Topic[]>, TError> = {}
) {
  return useQuery({
    queryKey: getTopicsQK(),
    queryFn: () => searchTopics(),
    ...options,
  })
}

export function useUpdateTopic<TError = unknown>(
  options: UseMutationOptions<ChaosResponse<Topic>, TError, UpdateTopicDto> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTopic,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getTopicQK(response.data.id), response.data)
    },
  })
}

export function useDeleteTopic<TError = unknown>(
  options: UseMutationOptions<ChaosResponse<Topic>, TError, EntityId> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTopic,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getTopicQK(response.data.id), null)
    },
  })
}
