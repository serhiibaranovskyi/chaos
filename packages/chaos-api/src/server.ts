import { fastify, FastifyInstance } from 'fastify'

export const server: FastifyInstance = fastify({
  logger: true,
})

server.listen({ port: 8080 }, (err: Error | null) => {
  if (err) {
    server.log.error(err)
  }
})
