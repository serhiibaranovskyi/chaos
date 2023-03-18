import { fastify, FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import { prisma } from '@/db'
import { TopicService } from '@/topic'
import { EventService } from '@/event'
import { registerTopicRoutes } from '@/topic/topic.route-v1'
import { registerEventRoutes } from '@/event/event.route-v1'
import { LOGGER_CONFIG } from '@/logger'
import { ENV, SERVER_HOST, SERVER_PORT } from '@/config'

const server: FastifyInstance = fastify({
  logger: LOGGER_CONFIG[ENV] ?? true,
})

server.decorate('services', {
  topic: new TopicService(prisma),
  event: new EventService(prisma),
})

server.register(cors)

server.register(registerTopicRoutes, { prefix: '/v1/topics' })
server.register(registerEventRoutes, { prefix: '/v1/events' })

const start = async () => {
  try {
    await server.listen({
      port: SERVER_PORT,
      host: SERVER_HOST,
    })
  } catch (err) {
    server.log.error(err)
  }
}

if (require.main === module) {
  start()
}
