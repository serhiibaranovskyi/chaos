import type { FastifyRequest } from 'fastify/types/request'
import type { FastifyReply } from 'fastify/types/reply'

import { prisma } from '../db'

import { IEventServiceInterface, IEventControllerInterface } from './interfaces'
import { EventService } from './event.service'
