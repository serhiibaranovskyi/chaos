import type { FastifyRequest } from 'fastify/types/request'
import type { FastifyReply } from 'fastify/types/reply'
export interface IEventControllerInterface {
  create(request: FastifyRequest, replay: FastifyReply): void
}
