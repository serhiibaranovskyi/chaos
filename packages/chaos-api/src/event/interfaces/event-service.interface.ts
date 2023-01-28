import { CreateEventDto } from '../dto'

import type { Event } from './event.interface'

export interface IEventServiceInterface {
  create(topicId: number, payload: CreateEventDto): Promise<Event>
  findById(id: number): Promise<Event | null>
  delete(id: number): void
}
