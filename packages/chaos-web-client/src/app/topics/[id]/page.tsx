'use client'
import type { GetServerSidePropsContext } from 'next'

import { PageLoader } from '@/shared/components/page-loader'
import { Paper } from '@/shared/components/paper'
import { TopicDetails } from '@/feature/topic/topic-details'
import { useTopic } from '@/api/react-query/topic'
import { Box } from '@/shared/components/box'
import { Typography } from '@/shared/components/typography'

function TopicDetailsPage(props: GetServerSidePropsContext<{ id: string }>) {
  const topicId = props.params?.id as string
  const { response } = useTopic(topicId, {
    enabled: Boolean(topicId),
  })

  if (!response?.data) {
    return <PageLoader />
  }

  return (
    <Paper component="main" sx={{ display: { sm: 'flex' } }}>
      <TopicDetails
        maxWidth={{ sm: '400px' }}
        px={4}
        py={3}
        topic={response.data}
      />
      <Box bgcolor="grey.100" flexGrow={1} px={4} py={3}>
        <Typography variant="h4">Event</Typography>
        <Typography>todo;</Typography>
      </Box>
    </Paper>
  )
}

export default TopicDetailsPage
