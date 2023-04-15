import type { PrismaClient } from '@prisma/client'

import { withPrismaErrorHook } from '@/shared/prisma'

import type { CreateEventPayloadDto } from './event.dto'
import type { Event } from './event.interface'

export class EventService {
  private db: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.db = prisma
  }

  @withPrismaErrorHook()
  public create(
    topicId: number,
    payload: CreateEventPayloadDto
  ): Promise<Event> {
    return this.db.event.create({
      data: {
        topic: {
          connect: { id: topicId },
        },
        payload,
      },
    })
  }

  @withPrismaErrorHook()
  public findById(id: number): Promise<Event | null> {
    return this.db.event.findUnique({ where: { id } })
  }

  @withPrismaErrorHook()
  public findByTopicId(topicId: number): Promise<Event[]> {
    return this.db.event.findMany({
      orderBy: [{ createdAt: 'desc' }],
      where: { topicId },
    })
  }

  @withPrismaErrorHook()
  public async delete(id: number) {
    await this.db.event.delete({ where: { id } })
  }
}
