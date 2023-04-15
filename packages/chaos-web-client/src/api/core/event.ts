import type { JsonArray, JsonObject } from 'type-fest'

import { EntityId, mkTopicEventsUrl, mkTopicEventUrl, request } from './common'

export type ChaosEvent = {
  id: number
  createdAt: string
  payload: JsonObject | JsonArray
  topicId: number
  updatedAt: string
}

export type CreateTopicEventDto = {
  topicId: number
  payload: JsonObject | JsonArray
}

export type DeleteTopicEventDto = {
  topicId: number
  id: number
}

export function createTopicEvent(data: CreateTopicEventDto) {
  return request<ChaosEvent>(mkTopicEventsUrl(data.topicId), {
    body: JSON.stringify({ payload: data.payload }),
    method: 'POST',
  })
}

export function fetchTopicEvent(topicId: EntityId, id: EntityId) {
  return request<ChaosEvent>(mkTopicEventUrl(topicId, id))
}

export function fetchTopicEvents(topicId: EntityId) {
  return request<ChaosEvent[]>(mkTopicEventsUrl(topicId))
}

export function deleteTopicEvent(payload: DeleteTopicEventDto) {
  return request<null>(mkTopicEventUrl(payload.topicId, payload.id), {
    method: 'DELETE',
  })
}
