'use client'

import * as React from 'react'

import type { Topic } from '@/api/core/topic'
import { displayDateTime } from '@/shared/utils/date-fmt'
import { Stack } from '@/shared/components/stack'
import { styled } from '@/shared/styles'
import { Typography } from '@/shared/components/typography'
import { Box, BoxProps } from '@/shared/components/box'

export type TopicCardProps = {
  topic: Topic
} & BoxProps

const DatePreview = styled(Typography)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  text-align: right;
  text-transform: capitalize;
`

export function TopicDetails(props: TopicCardProps) {
  const { topic, ...other } = props

  return (
    <Box {...other}>
      <Typography sx={{ flexGrow: 1 }} variant="h4">
        {topic.title}
      </Typography>
      <Stack mb={2}>
        <DatePreview>Created: {displayDateTime(topic.createdAt)}</DatePreview>
        <DatePreview>Updated: {displayDateTime(topic.updatedAt)}</DatePreview>
      </Stack>
      <Typography paragraph>{topic.description}</Typography>
    </Box>
  )
}
