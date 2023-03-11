'use client'

import qs from 'query-string'
import { rest, setupWorker } from 'msw'
import { faker } from '@faker-js/faker'

import type { CreateTopicDto, Topic, UpdateTopicDto } from '@/api/core/topic'
import { mkTopicsUrl, mkTopicUrl } from '@/api/core/common'

let lastTopicId = 0

// eslint-disable-next-line
function containsText(target: string, needle: any) {
  if (!needle) {
    return true
  }
  return target.toLowerCase().includes(needle.toLowerCase())
}

function generateTopic(): Topic {
  return {
    id: ++lastTopicId,
    createdAt: faker.date.past().toISOString(),
    description: faker.lorem.text(),
    title: faker.commerce.productName(),
    updatedAt: faker.date.past().toISOString(),
  }
}

function generateTopics(count = 20): Topic[] {
  return new Array(count).fill(null).map(generateTopic)
}

let topics = generateTopics()

function init() {
  const worker = setupWorker(
    // Search
    rest.get(`${mkTopicsUrl()}?*`, (req, res, ctx) => {
      const params = qs.parseUrl(req.url.href)
      const term = (params.query?.term ?? '') as string
      return res(
        ctx.delay(Math.random() * 2000),
        ctx.status(200),
        ctx.json({
          data: topics.filter(
            (t) =>
              containsText(t.title, term) || containsText(t.description, term)
          ),
          ok: true,
        })
      )
    }),
    //Get
    rest.get(mkTopicUrl(':topicId'), async (req, res, ctx) => {
      const topic = topics.find((t) => t.id === +req.params.topicId)
      return res(
        ctx.delay(Math.random() * 2000),
        ctx.status(200),
        ctx.json({
          data: topic,
          ok: true,
        })
      )
    }),
    // Create
    rest.post<CreateTopicDto>(mkTopicsUrl(), async (req, res, ctx) => {
      const payload = await req.json()
      const now = new Date().toISOString()
      const newTopic = {
        id: ++lastTopicId,
        ...payload,
        createdAt: now,
        updatedAt: now,
      } as Topic
      topics = [newTopic, ...topics]

      return res(
        ctx.delay(Math.random() * 2000),
        ctx.status(200),
        ctx.json({
          data: newTopic,
          ok: true,
        })
      )
    }),
    // Update
    rest.patch<UpdateTopicDto['data']>(
      mkTopicUrl(':topicId'),
      async (req, res, ctx) => {
        const payload = await req.json()
        const modifiedTopic = topics.find(
          (t) => t.id === +req.params.topicId
        ) as Topic

        ;['title', 'description'].forEach((field) => {
          if (payload[field] != null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(modifiedTopic as any)[field] = payload[field]
          }
        })

        return res(
          ctx.delay(Math.random() * 2000),
          ctx.status(200),
          ctx.json({
            data: modifiedTopic,
            ok: true,
          })
        )
      }
    ),
    // Delete
    rest.delete(mkTopicUrl(':topicId'), async (req, res, ctx) => {
      topics = topics.filter((t) => t.id !== +req.params.topicId)
      return res(
        ctx.delay(Math.random() * 2000),
        ctx.status(200),
        ctx.json({
          data: null,
          ok: true,
        })
      )
    })
  )
  worker.start({ quiet: true })
}

if (typeof window === 'object') {
  init()
}
