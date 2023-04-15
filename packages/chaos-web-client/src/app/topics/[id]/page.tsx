'use client'
import { enqueueSnackbar } from 'notistack'
import { useToggle } from 'react-use'
import type { GetServerSidePropsContext } from 'next'

import { Box } from '@/shared/components/box'
import { Button } from '@/shared/components/button'
import { EventList } from '@/feature/event/event-list'
import { PageLoader } from '@/shared/components/page-loader'
import { Paper } from '@/shared/components/paper'
import { TopicDetails } from '@/feature/topic/topic-details'
import { Typography } from '@/shared/components/typography'
import { useCreateTopicEvent, useTopicEvents } from '@/api/react-query/event'
import { useTopic } from '@/api/react-query/topic'
import {
  CreateEventDialog,
  FormValues,
} from '@/feature/event/create-event-dialog'

function TopicDetailsPage(props: GetServerSidePropsContext<{ id: string }>) {
  const topicId = props.params?.id as string
  const { response: topicResponse } = useTopic(topicId, {
    enabled: Boolean(topicId),
  })
  const { response: topicEventsResponse } = useTopicEvents(topicId, {
    enabled: Boolean(topicId),
  })

  const [isCreateEventDialogOpen, toggleCreateEventDialog] = useToggle(false)
  const createTopicEventMutation = useCreateTopicEvent()
  const handlePublishNewEvent = async (values: FormValues) => {
    await createTopicEventMutation.mutateAsync({ ...values, topicId: +topicId })
    toggleCreateEventDialog()
    enqueueSnackbar('Message Published', { variant: 'success' })
  }

  if (!topicResponse?.data) {
    return <PageLoader />
  }

  return (
    <Paper component="main" sx={{ display: { md: 'flex' } }}>
      <TopicDetails
        maxWidth={{ md: '400px' }}
        minWidth={{ md: '350px' }}
        px={4}
        py={3}
        topic={topicResponse.data}
      />
      <Box bgcolor="grey.100" flexGrow={1} px={4} py={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Events</Typography>
          <Button
            onClick={() => toggleCreateEventDialog()}
            variant="contained"
            sx={{ ml: 2 }}
          >
            Publish New
          </Button>
        </Box>
        <EventList data={topicEventsResponse?.data} />
      </Box>
      <CreateEventDialog
        inProgress={createTopicEventMutation.status === 'loading'}
        onClose={toggleCreateEventDialog}
        onPublish={handlePublishNewEvent}
        open={isCreateEventDialogOpen}
      />
    </Paper>
  )
}

export default TopicDetailsPage
