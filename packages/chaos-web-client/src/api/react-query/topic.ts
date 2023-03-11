'use client'
import { useQueryClient } from '@tanstack/react-query'

import type { ChaosResponse, EntityId } from '@/api/core/common'
import {
  createTopic,
  CreateTopicDto,
  deleteTopic,
  fetchTopic,
  searchTopics,
  SearchTopicsDto,
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

export const TOPIC_MAPPING_BASE_QK = ['topics'] as const
export const TOPIC_COLLECTIONS_BASE_QK = ['topic-collections'] as const

export function getTopicsSearchQK(payload: SearchTopicsDto) {
  return [...TOPIC_COLLECTIONS_BASE_QK, 'search', payload] as const
}

export function getTopicQK(id: EntityId) {
  return [...TOPIC_MAPPING_BASE_QK, id] as const
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
      queryClient.invalidateQueries({ queryKey: TOPIC_COLLECTIONS_BASE_QK })
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
  payload: SearchTopicsDto,
  options: UseQueryOptions<ChaosResponse<Topic[]>, TError> = {}
) {
  return useQuery({
    queryKey: getTopicsSearchQK(payload),
    queryFn: () => searchTopics(payload),
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
      queryClient.invalidateQueries({ queryKey: TOPIC_COLLECTIONS_BASE_QK })
    },
  })
}

export function useDeleteTopic<TError = unknown>(
  options: UseMutationOptions<ChaosResponse<null>, TError, EntityId> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTopic,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getTopicQK(payload), null)
      queryClient.invalidateQueries({ queryKey: TOPIC_COLLECTIONS_BASE_QK })
    },
  })
}
