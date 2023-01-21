import { it, describe, beforeEach, expect } from '@jest/globals'
import { faker } from '@faker-js/faker'

import { prisma } from '../db'
import { Topic } from '../topic/interfaces'

import { EventService } from './event.service'
import { Event } from './interfaces'

const MOCKED_TOPICS = faker.datatype.array(3).map(() => ({
  title: faker.lorem.words(2),
  description: faker.lorem.paragraph(),
}))

describe('EventService', () => {
  let eventService: EventService
  let firstTopic: Topic
  let firstEvent: Event
  const eventDto = {
    title: 'Mocked title',
    description: 'Mocked description',
  }

  beforeEach(async () => {
    eventService = new EventService(prisma)
    await prisma.topic.createMany({ data: MOCKED_TOPICS })
    firstTopic = (await prisma.topic.findFirst()) as Topic
    firstEvent = await prisma.event.create({
      data: {
        topic: {
          connect: { id: firstTopic.id },
        },
        payload: eventDto,
      },
    })
  })

  it('Should create a new event', async () => {
    const event = await eventService.create(firstTopic.id, eventDto)
    expect(event).toMatchObject({
      payload: eventDto,
    })
  })

  it('Should find a event by id', async () => {
    const foundedEvent = await eventService.findById(firstEvent.id)
    expect(foundedEvent).toMatchObject(firstEvent)
  })

  it('Should delete a event', async () => {
    await eventService.delete(firstEvent.id)
    const foundedEvent = await eventService.findById(firstEvent.id)
    expect(foundedEvent).toBeNull()
  })
})
