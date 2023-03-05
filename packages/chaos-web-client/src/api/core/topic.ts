import { EntityId, mkTopicsUrl, mkTopicUrl, request } from './common'

export type Topic = {
  id: number
  createdAt: number
  description: string
  title: string
  updatedAt: number
}

export type CreateTopicDto = {
  description: string
  title: string
}

export type UpdateTopicDto = {
  id: EntityId
  data: {
    description: string
    title: string
  }
}

export function createTopic(payload: CreateTopicDto) {
  return request<Topic>(mkTopicsUrl(), {
    body: JSON.stringify(payload),
    method: 'POST',
  })
}

export function fetchTopic(id: EntityId) {
  return request<Topic>(mkTopicUrl(id))
}

export function searchTopics() {
  return request<Topic[]>(mkTopicsUrl())
}

export function updateTopic(payload: UpdateTopicDto) {
  return request<Topic>(mkTopicUrl(payload.id), {
    body: JSON.stringify(payload.data),
    method: 'PATCH',
  })
}

export function deleteTopic(id: EntityId) {
  return request<Topic>(mkTopicUrl(id), {
    method: 'DELETE',
  })
}
