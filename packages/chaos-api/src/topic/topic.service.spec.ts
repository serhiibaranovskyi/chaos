import { it, describe, beforeEach, expect } from '@jest/globals'
import { faker } from '@faker-js/faker'

import { prisma } from '@/db'

import { TopicService } from './topic.service'
import type { Topic } from './topic.interface'

const MOCKED_TOPICS = faker.datatype.array(3).map(() => ({
  title: faker.lorem.words(2),
  description: faker.lorem.paragraph(),
}))

describe('TopicService', () => {
  let topicService: TopicService
  let firstTopic: Topic

  beforeEach(async () => {
    topicService = new TopicService(prisma)
    await prisma.topic.createMany({ data: MOCKED_TOPICS })
    firstTopic = (await prisma.topic.findFirst()) as Topic
  })

  it('Should create a new topic', async () => {
    const topicDto = { title: 'New topic', description: 'Topic Description' }
    const topic = await topicService.create(topicDto)
    expect(topic).toMatchObject(topicDto)
  })

  it('Should find a topic by id', async () => {
    const topic = await topicService.findById(firstTopic.id)
    expect(topic).toMatchObject(firstTopic)
  })

  it('Should update a topic', async () => {
    const updates = {
      title: 'New Topic Title',
      description: 'New Topic Description',
    }
    const topic = await topicService.update(firstTopic.id, updates)
    expect(topic).toMatchObject(updates)
  })

  it('Should delete a topic', async () => {
    await topicService.delete(firstTopic.id)
    const topic = await topicService.findById(firstTopic.id)
    expect(topic).toBeNull()
  })
})
