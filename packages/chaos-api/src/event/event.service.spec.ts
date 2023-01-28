import { it, describe, beforeEach, expect } from '@jest/globals'
import { faker } from '@faker-js/faker'

import { prisma } from '@/db'
import { Topic } from '@/topic'

import { EventService } from './event.service'
import { Event } from './interfaces'
import { CreateEventDto } from './dto'

describe('EventService', () => {
  let eventService: EventService
  let firstTopic: Topic
  let firstEvent: Event
  let mockedEventDto: CreateEventDto

  beforeEach(async () => {
    mockedEventDto = {
      title: faker.lorem.words(2),
      description: faker.lorem.words(2),
    }
    eventService = new EventService(prisma)
    firstTopic = await prisma.topic.create({
      data: {
        title: 'Mocked topic title',
        description: 'Mocker topic description',
      },
    })
    await prisma.event.createMany({
      data: {
        topicId: firstTopic.id,
        payload: mockedEventDto,
      },
    })
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
    const foundedEvent = await eventService.findById(firstEvent.id)
    expect(foundedEvent).toMatchObject(firstEvent)
  })

  it('Should delete a event', async () => {
    await eventService.delete(firstEvent.id)
    const foundedEvent = await eventService.findById(firstEvent.id)
    expect(foundedEvent).toBeNull()
  })
})
