import { prisma } from '../../prisma'

type CreateEventPayload = any
export class EventService {
  async create(payload: CreateEventPayload) {
    try {
      return prisma.event.create({
        data: {
          payload,
        },
      })
    } catch (err) {
      throw err
    }
  }

  async delete(id: number) {
    try {
      const exists = await prisma.event.findUnique({
        where: {
          id,
        },
      })
      if (!exists) {
        return Promise.reject(
          Error(`Can\`t delete event with provided id ${id}`)
        )
      }
      return prisma.event.delete({
        where: {
          id,
        },
      })
    } catch (err) {
      throw err
    }
  }
}
