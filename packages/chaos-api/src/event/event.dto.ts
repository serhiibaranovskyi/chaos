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

export const EventResponseSchema = makeResponseSchema(EventSchema)

export const CreateEventSchema = Type.Object({
  topicId: Type.Number(),
  payload: CreateEventPayloadSchema,
})

export const EventIdSchema = Type.Object({
  id: Type.Number(),
})

export type EventResponseDto = Static<typeof EventResponseSchema>

export type CreateEventDto = Static<typeof CreateEventSchema>

export type CreateEventPayloadDto = Static<typeof CreateEventPayloadSchema>

export type EventIdDto = Static<typeof EventIdSchema>