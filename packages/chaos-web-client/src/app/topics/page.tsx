'use client'
import { useCallback, useDeferredValue, useState } from 'react'
import { useSnackbar } from 'notistack'

import type { Topic } from '@/api/core/topic'
import { EditTopicDialog } from '@/feature/topic/edit-topic-dialog'
import { PageLoader } from '@/shared/components/page-loader'
import { TopicGrid } from '@/feature/topic/topic-grid'
import { useTopicActionsContext } from '@/shared/context/topic-actions'
import {
  useDeleteTopic,
  useTopicsSearch,
  useUpdateTopic,
} from '@/api/react-query/topic'

function TopicsDashboardPage() {
  const { enqueueSnackbar } = useSnackbar()
  const { searchTerm } = useTopicActionsContext()
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const { isLoading, response } = useTopicsSearch({ term: deferredSearchTerm })

  const [topicToEdit, setTopicToEdit] = useState<Topic | null>(null)
  const updateTopicMutation = useUpdateTopic({
    onSuccess: () => {
      setTopicToEdit(null)
      enqueueSnackbar('Topic Updated', { variant: 'success' })
    },
  })

  const deleteTopicMutation = useDeleteTopic({
    onSuccess: () => enqueueSnackbar('Topic deleted', { variant: 'success' }),
  })
  const handleTopicDelete = useCallback(
    (topic: Topic) => {
      deleteTopicMutation.mutateAsync(topic.id)
    },
    [deleteTopicMutation]
  )

  return (
    <main>
      {isLoading ? (
        <PageLoader />
      ) : (
        <TopicGrid
          topics={response?.data ?? []}
          onTopicEdit={setTopicToEdit}
          onTopicDelete={handleTopicDelete}
        />
      )}
      {!!topicToEdit && (
        <EditTopicDialog
          inProgress={updateTopicMutation.isLoading}
          onClose={() => setTopicToEdit(null)}
          onUpdate={updateTopicMutation.mutate}
          open={true}
          topic={topicToEdit}
        />
      )}
    </main>
  )
}

export default TopicsDashboardPage
