import {
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyPluginOptions,
} from 'fastify'

import {
  CreateTopicSchema,
  SearchTopicsSchema,
  TopicIdSchema,
  UpdateTopicSchema,
} from './topic.dto'
import * as topicController from './topic.controller'

export function registerTopicRoutes(
  fastify: FastifyInstance,
  _opts: FastifyRegisterOptions<FastifyPluginOptions>,
  done: () => void
) {
  fastify.post(
    '/',
    {
      schema: {
        body: CreateTopicSchema,
      },
    },
    topicController.createTopic
  )
  fastify.get(
    '/:id',
    {
      schema: {
        params: TopicIdSchema,
      },
    },
    topicController.findTopicById
  )
  fastify.put(
    '/:id',
    {
      schema: {
        body: UpdateTopicSchema,
        params: TopicIdSchema,
      },
    },
    topicController.updateTopic
  )
  fastify.delete(
    '/:id',
    {
      schema: {
        params: TopicIdSchema,
      },
    },
    topicController.deleteTopic
  )
  fastify.get(
    '/',
    {
      schema: {
        querystring: SearchTopicsSchema,
      },
    },
    topicController.searchTopic
  )
  done()
}
