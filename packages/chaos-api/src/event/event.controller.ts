import type { FastifyRequest } from 'fastify/types/request'
import type { FastifyReply } from 'fastify/types/reply'

import { prisma } from '../db'

import { IEventServiceInterface, IEventControllerInterface } from './interfaces'
import { EventService } from './event.service'
import { CreateEventDto } from './dto'

const eventService = new EventService(prisma)

interface ICreateEventRequestPayload {
  topicId: number
  payload: CreateEventDto
}
class EventController implements IEventControllerInterface {
  private eventService: IEventServiceInterface

  public constructor(eventService: IEventServiceInterface) {
    this.eventService = eventService
  }

  public async create(request: FastifyRequest, replay: FastifyReply) {
    const { topicId, payload } = request.body as ICreateEventRequestPayload
    const event = await this.eventService.create(topicId, payload)
    return replay.send(event)
  }
}

export default new EventController(eventService)
