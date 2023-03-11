import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

import {
  EmptyResponseDto,
  makeEmptyResponse,
  makeResponse,
} from '@/shared/response'

import type {
  CreateTopicDto,
  TopicIdDto,
  TopicResponseDto,
  UpdateTopicDto,
  SearchTopicsDto,
  TopicListResponseDto,
} from './topic.dto'

export async function createTopic(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: CreateTopicDto }>
): Promise<TopicResponseDto> {
  const topic = await this.services.topic.create(request.body)
  return makeResponse(topic)
}

export async function findTopicById(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: TopicIdDto }>,
  reply: FastifyReply
): Promise<TopicResponseDto> {
  const topic = await this.services.topic.findById(request.params.id)
  if (topic == null) {
    return reply.status(404).send(makeEmptyResponse({ ok: false }))
  }
  return makeResponse(topic)
}

export async function updateTopic(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: UpdateTopicDto; Params: TopicIdDto }>
): Promise<TopicResponseDto> {
  const topic = await this.services.topic.update(
    request.params.id,
    request.body
  )
  return makeResponse(topic)
}

export async function deleteTopic(
  this: FastifyInstance,
  request: FastifyRequest<{ Params: TopicIdDto }>
): Promise<EmptyResponseDto> {
  await this.services.topic.delete(request.params.id)
  return makeResponse(null)
}

export async function searchTopic(
  this: FastifyInstance,
  request: FastifyRequest<{ Querystring: SearchTopicsDto }>
): Promise<TopicListResponseDto> {
  const topics = await this.services.topic.search(request.query.searchTerm)
  return makeResponse(topics)
}
