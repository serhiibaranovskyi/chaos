import qs from 'query-string'

import { EntityId, mkTopicsUrl, mkTopicUrl, request } from './common'

export type Topic = {
  id: number
  createdAt: string
  description: string
  title: string
  updatedAt: string
}

export type CreateTopicDto = {
  description: string
  title: string
}

export type SearchTopicsDto = {
  term?: string
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

export function searchTopics(payload: SearchTopicsDto = {}) {
  return request<Topic[]>(`${mkTopicsUrl()}?${qs.stringify(payload)}`)
}

export function updateTopic(payload: UpdateTopicDto) {
  return request<Topic>(mkTopicUrl(payload.id), {
    body: JSON.stringify(payload.data),
    method: 'PUT',
  })
}

export function deleteTopic(id: EntityId) {
  return request<null>(mkTopicUrl(id), {
    method: 'DELETE',
  })
}
