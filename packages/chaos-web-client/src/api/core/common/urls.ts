import type { EntityId } from '@/api/core/common/types'
import { CHAOS_BASE_URL } from '@/shared/config'

function mkUrl<TBase extends string, TPath extends string>(
  base: TBase,
  oath: TPath
): `${TBase}/${TPath}` {
  return `${base}/${oath}`
}

function mkApiV1Url<TPath extends string>(path: TPath) {
  return mkUrl(`${CHAOS_BASE_URL}/v1` as '<CHAOS_BASE_URL>/api/v1', path)
}

/*
 * Topics URLs
 */
export const mkTopicsUrl = () => mkApiV1Url('topics')
export const mkTopicUrl = (topicId: EntityId) =>
  `${mkTopicsUrl()}/${topicId}` as const

/*
 * Events URLs
 */
export const mkTopicEventsUrl = (topicId: EntityId) =>
  `${mkTopicUrl(topicId)}/events`
export const mkTopicEventUrl = (topicId: EntityId, eventId: EntityId) =>
  `${mkTopicEventsUrl(topicId)}/${eventId}` as const
