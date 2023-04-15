'use client'
import { useQueryClient } from '@tanstack/react-query'

import type { ChaosResponse, EntityId } from '@/api/core/common'
import {
  ChaosEvent,
  createTopicEvent,
  CreateTopicEventDto,
  deleteTopicEvent,
  DeleteTopicEventDto,
  fetchTopicEvent,
  fetchTopicEvents,
} from '@/api/core/event'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from './common'

export const EVENT_MAPPING_BASE_QK = ['event'] as const

export function getTopicEventsQK(topicId: EntityId, id?: EntityId | 'all') {
  return id
    ? [...EVENT_MAPPING_BASE_QK, 'topic', topicId, id]
    : [...EVENT_MAPPING_BASE_QK, 'topic', topicId]
}

export function useCreateTopicEvent<TError = unknown>(
  options: UseMutationOptions<
    ChaosResponse<ChaosEvent>,
    TError,
    CreateTopicEventDto
  > = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTopicEvent,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.invalidateQueries({ queryKey: EVENT_MAPPING_BASE_QK })
      queryClient.setQueryData(
        getTopicEventsQK(response.data.topicId, response.data.id),
        response.data
      )
    },
  })
}

export function useTopicEvent<TError = unknown>(
  topicId: EntityId,
  id: EntityId,
  options: UseQueryOptions<ChaosResponse<ChaosEvent>, TError> = {}
) {
  return useQuery({
    queryKey: getTopicEventsQK(topicId, id),
    queryFn: () => fetchTopicEvent(topicId, id),
    ...options,
  })
}

export function useTopicEvents<TError = unknown>(
  topicId: EntityId,
  options: UseQueryOptions<ChaosResponse<ChaosEvent[]>, TError> = {}
) {
  return useQuery({
    queryKey: getTopicEventsQK(topicId, 'all'),
    queryFn: () => fetchTopicEvents(topicId),
    ...options,
  })
}

export function useDeleteTopicEvent<TError = unknown>(
  options: UseMutationOptions<
    ChaosResponse<null>,
    TError,
    DeleteTopicEventDto
  > = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTopicEvent,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.invalidateQueries({ queryKey: EVENT_MAPPING_BASE_QK })
      queryClient.setQueryData(
        getTopicEventsQK(payload.id, payload.topicId),
        null
      )
    },
  })
}
