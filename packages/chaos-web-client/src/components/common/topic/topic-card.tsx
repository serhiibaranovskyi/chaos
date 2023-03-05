'use client'

import * as React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import type { Topic } from '@/api/core/topic'
import { Button } from '@/components/ui/button'
import { Card, CardProps } from '@/components/ui/card'
import { CardActions } from '@/components/ui/card-actions'
import { CardContent } from '@/components/ui/card-content'
import { CardHeader } from '@/components/ui/card-header'
import { displayDateTime } from '@/utils/date-fmt'
import { IconButton } from '@/components/ui/icon-button'
import { styled } from '@/styles'
import { Typography } from '@/components/ui/typography'

export type TopicCardProps = {
  topic: Topic
} & CardProps

const ConentTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  height: 82px;
  overflow: hidden;
`

export function TopicCard(props: TopicCardProps) {
  const { topic, ...other } = props

  return (
    <Card {...other}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={displayDateTime(topic.createdAt)}
        title={topic.title}
      />
      <CardContent>
        <ConentTypography color="text.secondary" variant="body2">
          {topic.description}
        </ConentTypography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button size="small" sx={{ ml: 'auto' }}>
          More
        </Button>
      </CardActions>
    </Card>
  )
}
