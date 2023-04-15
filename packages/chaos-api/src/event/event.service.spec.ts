import { beforeEach, describe, expect, it } from '@jest/globals'
import { faker } from '@faker-js/faker'

import { prisma } from '@/db'
import type { Topic } from '@/topic'

import { EventService } from './event.service'
import type { Event } from './event.interface'

const TOPICS_COUNT = 2
const TOPIC_EVENTS_COUNT = 2

function generateTopicMocks(count: number) {
  return faker.datatype.array(count).map(() => ({
    title: faker.lorem.words(2),
    description: faker.lorem.paragraph(),
  }))
}

function generateEventMocks(count: number) {
  return faker.datatype.array(count).map(() => ({
    title: faker.lorem.words(2),
    description: faker.lorem.words(2),
  }))
}

describe('EventService', () => {
  let eventService: EventService
  let firstTopic: Topic
  let firstEvent: Event

  beforeEach(async () => {
    eventService = new EventService(prisma)
    await prisma.topic.createMany({ data: generateTopicMocks(TOPICS_COUNT) })
    const allTopics = await prisma.topic.findMany()
    await prisma.event.createMany({
      data: allTopics.flatMap((topic) =>
        generateEventMocks(TOPIC_EVENTS_COUNT).map((event) => ({
          payload: event,
          topicId: topic.id,
        }))
      ),
    })
    firstTopic = allTopics[0] as Topic
    firstEvent = (await prisma.event.findFirst()) as Event
  })

  it('Should create a new event', async () => {
    const eventDto = {
      title: 'Mocked title',
      description: 'Mocked description',
    }
    const event = await eventService.create(firstTopic.id, eventDto)
    expect(event).toMatchObject({
      payload: eventDto,
    })
  })

  it('Should find a event by id', async () => {
    const event = await eventService.findById(firstEvent.id)
    expect(event).toMatchObject(firstEvent)
  })

  it('Should find events by topicId', async () => {
    const events = await eventService.findByTopicId(firstTopic.id)
    expect(events).toHaveLength(TOPIC_EVENTS_COUNT)
    for (const event of events) {
      expect(event.topicId).toBe(firstTopic.id)
    }
  })

  it('Should delete a event', async () => {
    await eventService.delete(firstEvent.id)
    const event = await eventService.findById(firstEvent.id)
    expect(event).toBeNull()
  })
})
