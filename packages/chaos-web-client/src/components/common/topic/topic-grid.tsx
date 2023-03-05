'use client'

import { Topic } from '@/api/core/topic'
import { Grid, GridProps } from '@/components/ui/grid'

import { TopicCard } from './topic-card'

export type TopicGridProps = {
  topics: Topic[]
} & GridProps

export function TopicGrid(props: TopicGridProps) {
  const { topics, ...other } = props

  return (
    <Grid container spacing={2} {...other}>
      {topics.map((topic) => (
        <Grid key={topic.id} xs={12} sm={6} md={4} xl={3}>
          <TopicCard topic={topic} />
        </Grid>
      ))}
    </Grid>
  )
}
