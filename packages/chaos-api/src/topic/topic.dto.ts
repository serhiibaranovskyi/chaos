import { Static, Type } from '@sinclair/typebox'

import { makeResponseSchema } from '@/shared/response'

export const TopicIdSchema = Type.Object({
  id: Type.Number(),
})

export const TopicSchema = Type.Object({
  id: Type.Number(),
  createdAt: Type.Date(),
  description: Type.String(),
  title: Type.String(),
  updatedAt: Type.Date(),
})

export const TopicListSchema = Type.Array(TopicSchema)

export const TopicResponseSchema = makeResponseSchema(TopicSchema)

export const TopicListResponseSchema = makeResponseSchema(TopicListSchema)

export const CreateTopicSchema = Type.Object({
  description: Type.String({ minLength: 16 }),
  title: Type.String({ minLength: 5 }),
})

export const UpdateTopicSchema = Type.Object({
  description: Type.String({ minLength: 16 }),
  title: Type.String({ minLength: 5 }),
})

export const SearchTopicsSchema = Type.Object({
  term: Type.Optional(Type.String()),
})

export type TopicIdDto = Static<typeof TopicIdSchema>

export type TopicDto = Static<typeof TopicSchema>

export type TopicResponseDto = Static<typeof TopicResponseSchema>

export type TopicListResponseDto = Static<typeof TopicListResponseSchema>

export type CreateTopicDto = Static<typeof CreateTopicSchema>

export type UpdateTopicDto = Static<typeof UpdateTopicSchema>

export type SearchTopicsDto = Static<typeof SearchTopicsSchema>
