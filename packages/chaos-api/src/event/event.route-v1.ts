import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
} from 'fastify'

import { CreateEventSchema, EventIdSchema } from './event.dto'
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
      },
    },
    eventController.createEvent
  )
  fastify.get(
    '/:id',
    {
      schema: {
        params: EventIdSchema,
      },
    },
    eventController.findEventById
  )
  fastify.delete(
    '/:id',
    {
      schema: {
        params: EventIdSchema,
      },
    },
    eventController.deleteEvent
  )
  done()
}
