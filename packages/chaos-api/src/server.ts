import { fastify, FastifyInstance } from 'fastify'

export const server: FastifyInstance = fastify({
  logger: true,
})

import { createTopic } from '@/topic/topic.route.v1'

server.register(createTopic, { prefix: '/v1' })

server.listen({ port: 8080 }, (err: Error | null) => {
  if (err) {
    server.log.error(err)
  }
})
