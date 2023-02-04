import type { PrismaClient } from '@prisma/client'

import { withPrismaErrorHook } from '@/shared/prisma'

import { CreateEventPayloadDto } from './event.dto'
import { Event } from './event.interface'

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
  public async delete(id: number) {
    return await this.db.event.delete({ where: { id } })
  }
}
