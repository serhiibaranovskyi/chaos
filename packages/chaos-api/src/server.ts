import { fastify, FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import { prisma } from '@/db'
import { TopicService } from '@/topic'
import { EventService } from '@/event'
import { registerTopicRoutes } from '@/topic/topic.route-v1'
import { registerEventRoutes } from '@/event/event.route-v1'
import { LOGGER_CONFIG } from '@/logger'
import { ENV, SERVER_HOST, SERVER_PORT } from '@/config'
import { createChan } from '@/shared/message-broker'

const server: FastifyInstance = fastify({
  logger: LOGGER_CONFIG[ENV] ?? true,
})

server.decorate('services', {
  topic: new TopicService(prisma),
  event: new EventService(prisma),
})

server.register(cors)

server.register(registerTopicRoutes, { prefix: '/v1/topics' })
server.register(registerEventRoutes, { prefix: '/v1/topics/:topicId/events' })

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

// todo: remove message-broker sample
async function consume() {
  const chan = await createChan()
  await chan.assertQueue('topics')
  server.log.info({ message: 'MESSAGE BROKER IS ACTIVE' })

  await chan.consume('topics', (msg) => {
    if (!msg) {
      return
    }

    const createdTopic = JSON.parse(msg?.content?.toString())
    server.log.info({
      message: 'New Topic Created',
      topic: createdTopic,
    })
    chan.ack(msg)
  })
}

if (require.main === module) {
  start()
  consume()
}
