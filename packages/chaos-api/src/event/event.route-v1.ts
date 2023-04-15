import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
} from 'fastify'

import {
  CreateEventSchema,
  TopicEventsURISchema,
  TopicEventURISchema,
} from './event.dto'
import * as eventController from './event.controller'

export function registerEventRoutes(
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<FastifyPluginOptions>,
  done: () => void
) {
  fastify.post(
    '/',
    {
      schema: {
        body: CreateEventSchema,
        params: TopicEventsURISchema,
      },
    },
    eventController.createEvent
  )
  fastify.get(
    '/',
    {
      schema: {
        params: TopicEventsURISchema,
      },
    },
    eventController.findEventsByTopicId
  )
  fastify.get(
    '/:id',
    {
      schema: {
        params: TopicEventURISchema,
      },
    },
    eventController.findEventById
  )
  fastify.delete(
    '/:id',
    {
      schema: {
        params: TopicEventURISchema,
      },
    },
    eventController.deleteEvent
  )
  done()
}
