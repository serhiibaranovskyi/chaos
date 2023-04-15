import { Static, Type } from '@sinclair/typebox'

import { makeResponseSchema } from '@/shared/response'

export const CreateEventPayloadSchema = Type.Record(
  Type.String(),
  Type.Union([Type.String(), Type.Number()])
)

export const EventSchema = Type.Object({
  id: Type.Number(),
  createdAt: Type.Date(),
  payload: CreateEventPayloadSchema,
  topicId: Type.Number(),
  updatedAt: Type.Date(),
})

export const EventListSchema = Type.Array(EventSchema)

export const EventResponseSchema = makeResponseSchema(EventSchema)

export const EventListResponseSchema = makeResponseSchema(EventListSchema)

export const CreateEventSchema = Type.Object({
  payload: CreateEventPayloadSchema,
})

export const TopicEventsURISchema = Type.Object({
  topicId: Type.Number(),
})

export const TopicEventURISchema = Type.Object({
  id: Type.Number(),
  topicId: Type.Number(),
})

export type EventResponseDto = Static<typeof EventResponseSchema>

export type EventListResponseDto = Static<typeof EventListResponseSchema>

export type CreateEventDto = Static<typeof CreateEventSchema>

export type CreateEventPayloadDto = Static<typeof CreateEventPayloadSchema>

export type TopicEventURIDto = Static<typeof TopicEventURISchema>

export type TopicEventsURIDto = Static<typeof TopicEventsURISchema>
