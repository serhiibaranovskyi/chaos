import type { PrismaClient } from '@prisma/client'

import { withPrismaErrorHook } from '@/shared/prisma'

import type { CreateTopicDto, UpdateTopicDto } from './topic.dto'
import type { Topic } from './topic.interface'

const WORDS_REGEX = /[\s\t\n]+/

export class TopicService {
  private db: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.db = prisma
  }

  @withPrismaErrorHook()
  public create(data: CreateTopicDto): Promise<Topic> {
    return this.db.topic.create({ data })
  }

  @withPrismaErrorHook()
  public findById(id: number): Promise<Topic | null> {
    return this.db.topic.findUnique({ where: { id } })
  }

  @withPrismaErrorHook()
  public update(id: number, data: UpdateTopicDto): Promise<Topic> {
    return this.db.topic.update({
      where: { id },
      data,
    })
  }

  @withPrismaErrorHook()
  public async delete(id: number) {
    await this.db.topic.delete({ where: { id } })
  }

  @withPrismaErrorHook()
  public async search(searchTerm?: string): Promise<Topic[]> {
    if (!searchTerm) {
      return this.db.topic.findMany()
    }
    return this.db.topic.findMany({
      where: {
        title: {
          search: searchTerm.split(WORDS_REGEX).join(' & '),
        },
        description: {
          search: searchTerm.split(WORDS_REGEX).join(' & '),
        },
      },
    })
  }
}
