export const createEventRequestSchema = {
  type: 'object',
  properties: {
    topicId: { type: 'int32' },
    payload: { type: 'string' },
  },
  required: ['topicId', 'payload'],
  additionalProperties: false,
}

export const createEventResponseSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
}
