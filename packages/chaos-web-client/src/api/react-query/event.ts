'use client'
import { useQueryClient } from '@tanstack/react-query'

import type { ChaosResponse, EntityId } from '@/api/core/common'
import {
  ChaosEvent,
  createEvent,
  CreateEventDto,
  deleteEvent,
  fetchEvent,
} from '@/api/core/event'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from './common'

export const EVENT_MAPPING_BASE_QK = ['event'] as const
export const EVENT_COLLECTIONS_BASE_QK = ['event-collections'] as const

export function getEventsQK() {
  return [...EVENT_COLLECTIONS_BASE_QK, 'all'] as const
}

export function getEventQK(id: EntityId) {
  return [...EVENT_MAPPING_BASE_QK, id] as const
}

export function useCreateEvent<TError = unknown>(
  options: UseMutationOptions<
    ChaosResponse<ChaosEvent>,
    TError,
    CreateEventDto
  > = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createEvent,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getEventQK(response.data.id), response.data)
      queryClient.invalidateQueries({ queryKey: EVENT_COLLECTIONS_BASE_QK })
    },
  })
}

export function useEvent<TError = unknown>(
  id: EntityId,
  options: UseQueryOptions<ChaosResponse<ChaosEvent>, TError> = {}
) {
  return useQuery({
    queryKey: getEventQK(id),
    queryFn: () => fetchEvent(id),
    ...options,
  })
}

export function useDeleteEvent<TError = unknown>(
  options: UseMutationOptions<ChaosResponse<null>, TError, EntityId> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEvent,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getEventQK(payload), null)
      queryClient.invalidateQueries({ queryKey: EVENT_COLLECTIONS_BASE_QK })
    },
  })
}
