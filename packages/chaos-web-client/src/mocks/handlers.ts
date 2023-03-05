'use client'
import { rest, setupWorker } from 'msw'
import { faker } from '@faker-js/faker'

import type { Topic } from '@/api/core/topic'
import { mkTopicsUrl } from '@/api/core/common'

const topics: Topic[] = new Array(20).fill(null).map(
  (_, idx) =>
    ({
      id: idx,
      createdAt: faker.date.past().getTime(),
      description: faker.lorem.text(),
      title: faker.commerce.productName(),
      updatedAt: faker.date.past().getTime(),
    } satisfies Topic)
)

function init() {
  const worker = setupWorker(
    rest.get(mkTopicsUrl(), (req, res, ctx) => {
      return res(
        ctx.delay(Math.random() * 2000),
        ctx.status(200),
        ctx.json({
          data: topics,
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
