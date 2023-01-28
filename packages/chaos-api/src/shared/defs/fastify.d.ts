import type { TopicService } from '@/topic'

declare module 'fastify' {
  interface ChaosServices {
    topic: TopicService
  }

  interface FastifyInstance {
    services: ChaosServices
  }
}
