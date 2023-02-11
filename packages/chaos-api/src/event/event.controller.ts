import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

import {
  EmptyResponseDto,
  makeEmptyResponse,
  makeResponse,
} from '@/shared/response'

import type { CreateEventDto, EventIdDto, EventResponseDto } from './event.dto'

export async function createEvent(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: CreateEventDto }>
): Promise<EventResponseDto> {
  const event = await this.services.event.create(
    request.body.topicId,
    request.body.payload
  )
  return makeResponse(event)
}

export async function findEventById(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: EventIdDto }>,
  reply: FastifyReply
): Promise<EventResponseDto> {
  const event = await this.services.event.findById(request.params.id)
  if (event === null) {
    return reply.status(404).send(makeEmptyResponse({ ok: false }))
  }
  return makeResponse(event)
}

export async function deleteEvent(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: EventIdDto }>
): Promise<EmptyResponseDto> {
  await this.services.event.delete(request.params.id)
  return makeResponse(null)
}
