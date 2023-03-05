import { EntityId, mkEventsUrl, mkEventUrl, request } from './common'

export type ChaosEventPayload = Record<string, string | number | boolean | null>

export type ChaosEvent = {
  id: number
  createdAt: number
  payload: ChaosEventPayload
  topicId: number
  updatedAt: number
}

export type CreateEventDto = {
  topicId: number
  payload: ChaosEventPayload
}

export function createEvent(payload: CreateEventDto) {
  return request<ChaosEvent>(mkEventsUrl(), {
    body: JSON.stringify(payload),
    method: 'POST',
  })
}

export function fetchEvent(id: EntityId) {
  return request<ChaosEvent>(mkEventUrl(id))
}

export function deleteEvent(id: EntityId) {
  return request<ChaosEvent>(mkEventUrl(id), {
    method: 'DELETE',
  })
}
