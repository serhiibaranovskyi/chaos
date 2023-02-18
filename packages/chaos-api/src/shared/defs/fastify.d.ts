import type { TopicService } from '@/topic'
import type { EventService } from '@/event'

declare module 'fastify' {
  interface ChaosServices {
    topic: TopicService
    event: EventService
  }

  interface FastifyInstance {
    services: ChaosServices
  }
}
