import { it, describe, beforeEach, expect } from '@jest/globals'

import { prisma } from '../db'

import { Topic } from './interfaces/topic.interface'
import { TopicService } from './topic.service'

const MOCKED_TOPICS = [
  { title: 'Topic-0', description: 'Topic-0 Description' },
  { title: 'Topic-1', description: 'Topic-2 Description' },
  { title: 'Topic-3', description: 'Topic-3 Description' },
]

describe('TopicService', () => {
  let topicService: TopicService
  let mockedTopics: Topic[]

  beforeEach(async () => {
    topicService = new TopicService(prisma)
    mockedTopics = []
    for (const topicDto of MOCKED_TOPICS) {
      mockedTopics.push(await prisma.topic.create({ data: topicDto }))
    }
  })

  it('Should create a new topic', async () => {
    const topicDto = { title: 'New topic', description: 'Topic Description' }
    const topic = await topicService.create(topicDto)
    expect(topic).toMatchObject(topicDto)
  })

  it('Should find a topic by id', async () => {
    const topic = await topicService.findById(mockedTopics[0].id)
    expect(topic).toMatchObject(mockedTopics[0])
  })

  it('Should update a topic', async () => {
    const updates = {
      title: 'New Topic Title',
      description: 'New Topic Description',
    }
    const topic = await topicService.update(mockedTopics[0].id, updates)
    expect(topic).toMatchObject(updates)
  })

  it('Should delete a topic', async () => {
    await topicService.delete(mockedTopics[0].id)
    const topic = await topicService.findById(mockedTopics[0].id)
    expect(topic).toBeNull()
  })
})
