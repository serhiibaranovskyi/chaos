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

export function getEventsQK() {
  return ['topics'] as const
}

export function getEventQK(id: EntityId) {
  return ['topics', id] as const
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
  options: UseMutationOptions<ChaosResponse<ChaosEvent>, TError, EntityId> = {}
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEvent,
    ...options,
    onSuccess: (response, payload, context) => {
      options?.onSuccess?.(response, payload, context)
      queryClient.setQueryData(getEventQK(response.data.id), null)
    },
  })
}
