'use client'

import * as React from 'react'
import NextLink from 'next/link'

import type { Topic } from '@/api/core/topic'
import { Button } from '@/shared/components/button'
import { Card, CardProps } from '@/shared/components/card'
import { CardActions } from '@/shared/components/card-actions'
import { CardContent } from '@/shared/components/card-content'
import { CardHeader } from '@/shared/components/card-header'
import { displayDateTime } from '@/shared/utils/date-fmt'
import { IconButton } from '@/shared/components/icon-button'
import { styled } from '@/shared/styles'
import { Tooltip } from '@/shared/components/tooltip'
import { Typography } from '@/shared/components/typography'
import {
  FavoriteIcon,
  MoreVertIcon,
  ShareIcon,
} from '@/shared/components/icons'

export type TopicCardProps = {
  onMenuOpen: (e: React.MouseEvent, topic: Topic) => void
  topic: Topic
} & CardProps

const Title = styled('span')`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

const ContentTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  height: 82px;
  overflow: hidden;
`

export function TopicCard(props: TopicCardProps) {
  const { onMenuOpen, topic, ...other } = props

  return (
    <Card {...other}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={(e) => onMenuOpen(e, topic)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        subheader={displayDateTime(topic.createdAt)}
        title={
          <Tooltip title={topic.title}>
            <Title>{topic.title}</Title>
          </Tooltip>
        }
      />
      <CardContent>
        <ContentTypography color="text.secondary" variant="body2">
          {topic.description}
        </ContentTypography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          component={NextLink}
          href={`topics/${topic.id}`}
          size="small"
          sx={{ ml: 'auto' }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  )
}
