'use client'

import React, { useCallback, useState } from 'react'

import type { Topic } from '@/api/core/topic'
import { Grid, GridProps } from '@/shared/components/grid'

import { TopicCard } from './topic-card'
import { TopicCardMenu } from './topic-card-menu'

export type TopicGridProps = {
  onTopicDelete: (topic: Topic) => void
  onTopicEdit: (topic: Topic) => void
  topics: Topic[]
} & GridProps

export function TopicGrid(props: TopicGridProps) {
  const { onTopicDelete, onTopicEdit, topics, ...other } = props
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | undefined>()
  const [menuTopic, setMenuTopic] = useState<Topic | null>()

  const handleMenuOpen = useCallback(
    (e: React.MouseEvent, topic: Topic) => {
      setMenuAnchor(e.currentTarget as HTMLElement)
      setMenuTopic(topic)
    },
    [setMenuAnchor, setMenuTopic]
  )

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(undefined)
    setMenuTopic(null)
  }, [setMenuAnchor, setMenuTopic])

  const triggerTopicEditEvent = useCallback(
    (topic: Topic) => {
      onTopicEdit(topic)
      handleMenuClose()
    },
    [handleMenuClose, onTopicEdit]
  )

  const triggerTopicDeleteEvent = useCallback(
    (topic: Topic) => {
      onTopicDelete(topic)
      handleMenuClose()
    },
    [handleMenuClose, onTopicDelete]
  )

  return (
    <>
      <Grid container spacing={2} {...other}>
        {topics.map((topic) => (
          <Grid key={topic.id} xs={12} sm={6} md={4} xl={3}>
            <TopicCard onMenuOpen={handleMenuOpen} topic={topic} />
          </Grid>
        ))}
      </Grid>
      {!!menuTopic && (
        <TopicCardMenu
          onEdit={triggerTopicEditEvent}
          anchorEl={menuAnchor}
          onClose={handleMenuClose}
          onDelete={triggerTopicDeleteEvent}
          open={Boolean(menuAnchor)}
          topic={menuTopic}
        />
      )}
    </>
  )
}
