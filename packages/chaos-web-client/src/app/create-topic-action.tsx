'use client'
import React from 'react'

import { AddIcon } from '@/shared/components/icons'
import { Fab } from '@/shared/components/fab'
import { useCreateTopic } from '@/api/react-query/topic'
import { useTopicActionsContext } from '@/shared/context/topic-actions'
import { CreateTopicDialog } from '@/feature/topic/create-topic-dialog'

export function CreateTopicAction() {
  const { isCreateTopicDialogOpen, toggleCreateTopicDialog } =
    useTopicActionsContext()
  const createTopicMutation = useCreateTopic({
    onSuccess: () => toggleCreateTopicDialog(false),
  })

  return (
    <>
      <Fab
        aria-label="Create Topic"
        color="primary"
        onClick={() => toggleCreateTopicDialog(true)}
        sx={{ position: 'fixed', bottom: 8, right: 6 }}
      >
        <AddIcon />
      </Fab>
      <CreateTopicDialog
        inProgress={createTopicMutation.isLoading}
        onClose={toggleCreateTopicDialog}
        onCreate={createTopicMutation.mutate}
        open={isCreateTopicDialogOpen}
      />
    </>
  )
}
