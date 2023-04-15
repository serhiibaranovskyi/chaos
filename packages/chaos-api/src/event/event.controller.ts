import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import {
  EmptyResponseDto,
  makeEmptyResponse,
  makeResponse,
} from '@/shared/response'

import type {
  CreateEventDto,
  EventResponseDto,
  TopicEventsURIDto,
  TopicEventURIDto,
} from './event.dto'
import { EventListResponseDto } from './event.dto'

export async function createEvent(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: CreateEventDto; Params: TopicEventsURIDto }>
): Promise<EventResponseDto> {
  const event = await this.services.event.create(
    request.params.topicId,
    request.body.payload
  )
  return makeResponse(event) as EventResponseDto
}

export async function findEventById(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: TopicEventURIDto }>,
  reply: FastifyReply
): Promise<EventResponseDto> {
  const event = await this.services.event.findById(request.params.id)
  if (event === null) {
    return reply.status(404).send(makeEmptyResponse({ ok: false }))
  }
  return makeResponse(event) as EventResponseDto
}

export async function findEventsByTopicId(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: TopicEventsURIDto }>
): Promise<EventListResponseDto> {
  const events = await this.services.event.findByTopicId(request.params.topicId)
  return makeResponse(events) as EventListResponseDto
}

export async function deleteEvent(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: TopicEventURIDto }>
): Promise<EmptyResponseDto> {
  await this.services.event.delete(request.params.id)
  return makeResponse(null)
}
