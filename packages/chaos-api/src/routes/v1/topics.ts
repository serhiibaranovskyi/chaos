import { server } from '@/server'
import {
  createTopic,
  deleteTopic,
  updateTopic,
  findTopicById,
} from '@/topic/topic.controller'
import {
  CreateTopicSchema,
  UpdateTopicSchema,
  TopicIdSchema,
} from '@/topic/topic.dto'

const URL = '/v1/topics'
server.route({
  method: 'POST',
  url: URL,
  schema: {
    body: CreateTopicSchema,
  },
  handler: createTopic,
})

server.route({
  method: 'DELETE',
  url: `${URL}/:id`,
  schema: {
    params: TopicIdSchema,
  },
  handler: deleteTopic,
})

server.route({
  method: 'PATCH',
  url: `${URL}/:id`,
  schema: {
    body: UpdateTopicSchema,
    params: TopicIdSchema,
  },
  handler: updateTopic,
})

server.route({
  method: 'GET',
  url: `${URL}/:id`,
  schema: {
    params: TopicIdSchema,
  },
  handler: findTopicById,
})
