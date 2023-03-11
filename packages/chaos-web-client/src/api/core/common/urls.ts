import type { EntityId } from '@/api/core/common/types'
import { CHAOS_BASE_URL } from '@/shared/config'

function mkUrl<TBase extends string, TPath extends string>(
  base: TBase,
  oath: TPath
): `${TBase}/${TPath}` {
  return `${base}/${oath}`
}

function mkApiV1Url<TPath extends string>(path: TPath) {
  return mkUrl(CHAOS_BASE_URL as '<CHAOS_BASE_URL>', path)
}

/*
 * Events URLs
 */
export const mkEventsUrl = () => mkApiV1Url('events')
export const mkEventUrl = (topicId: EntityId) =>
  `${mkEventsUrl()}/${topicId}` as const

/*
 * Topics URLs
 */
export const mkTopicsUrl = () => mkApiV1Url('topics')
export const mkTopicUrl = (topicId: EntityId) =>
  `${mkTopicsUrl()}/${topicId}` as const
