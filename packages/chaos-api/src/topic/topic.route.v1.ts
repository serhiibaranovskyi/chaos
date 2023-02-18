import { FastifyInstance } from 'fastify'

// import { server } from '@/server'
// import { HTTPMethods } from '@/shared/enums'

import * as topicController from './topic.controller'
// import {
//   CreateTopicSchema,
//   TopicIdSchema,
//   UpdateTopicSchema,
// } from './topic.dto'
export function createTopic(fastify: FastifyInstance, done: any) {
  fastify.post('/topics', topicController.createTopic)
  done()
}
// server.route({
//   method: HTTPMethods.POST,
//   url: '/topics',
//   schema: {
//     body: CreateTopicSchema,
//   },
//   handler: createTopic,
// })

// server.route({
//   method: HTTPMethods.DELETE,
//   url: `/topics/:id`,
//   schema: {
//     params: TopicIdSchema,
//   },
//   handler: deleteTopic,
// })

// server.route({
//   method: HTTPMethods.PATCH,
//   url: `/topics/:id`,
//   schema: {
//     body: UpdateTopicSchema,
//     params: TopicIdSchema,
//   },
//   handler: updateTopic,
// })

// server.route({
//   method: HTTPMethods.GET,
//   url: `/topics/:id`,
//   schema: {
//     params: TopicIdSchema,
//   },
//   handler: findTopicById,
// })
