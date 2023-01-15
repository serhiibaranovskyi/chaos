import type { PrismaClient } from '@prisma/client'

import { CreateEventDto } from './dto'
import { Event } from './interfaces'

export class EventService {
  private db: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.db = prisma
  }
  public create(topicId: number, payload: CreateEventDto): Promise<Event> {
    return this.db.event.create({
      data: {
        topic: {
          connect: { id: topicId },
        },
        payload,
      },
    })
  }

  public findById(id: number): Promise<Event | null> {
    return this.db.event.findUnique({ where: { id } })
  }

  public async delete(id: number) {
    return await this.db.event.delete({ where: { id } })
  }
}
