import type { PrismaClient } from '@prisma/client'

import type { CreateTopicDto } from './dto/create-topic.dto'
import type { Topic } from './interfaces/topic.interface'
import type { UpdateTopicDto } from './dto/update-topic.dto'

export class TopicService {
  private db: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.db = prisma
  }

  public create(data: CreateTopicDto): Promise<Topic> {
    return this.db.topic.create({ data })
  }

  public findById(id: number): Promise<Topic | null> {
    return this.db.topic.findUnique({ where: { id } })
  }

  public update(id: number, data: UpdateTopicDto): Promise<Topic> {
    return this.db.topic.update({
      where: { id },
      data,
    })
  }

  public async delete(id: number) {
    await this.db.topic.delete({ where: { id } })
  }
}
