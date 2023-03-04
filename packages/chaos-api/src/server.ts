import * as process from 'process'

import { fastify, FastifyInstance } from 'fastify'

import { prisma } from '@/db'
import { registerTopicRoutes } from '@/topic/topic.route-v1'
import { TopicService } from '@/topic'
import { EventService } from '@/event'
import { registerEventRoutes } from '@/event/event.route-v1'

const server: FastifyInstance = fastify({
  logger: true,
})

server.decorate('services', {
  topic: new TopicService(prisma),
  event: new EventService(prisma),
})

server.register(registerTopicRoutes, { prefix: '/v1/topics' })
server.register(registerEventRoutes, { prefix: '/v1/events' })

const start = async () => {
  try {
    await server.listen({
      port: +(process.env.PORT || 3001),
      host: process.env.HOST,
    })
  } catch (err) {
    server.log.error(err)
  }
}
start()
