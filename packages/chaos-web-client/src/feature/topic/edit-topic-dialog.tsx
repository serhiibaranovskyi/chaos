'use client'
import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import type { Topic, UpdateTopicDto } from '@/api/core/topic'
import { Button } from '@/shared/components/button'
import { Dialog } from '@/shared/components/dialog'
import { DialogActions } from '@/shared/components/dialog-actions'
import { DialogContent } from '@/shared/components/dialog-content'
import { DialogTitle } from '@/shared/components/dialog-title'
import { TextFieldCtrl } from '@/shared/components/form-controllers'

import { TOPIC_DESCRIPTION_SCHEMA, TOPIC_TITLE_SCHEMA } from './validators'

export type EditTopicDialogProps = {
  inProgress: boolean
  onClose: () => unknown
  onUpdate: (data: UpdateTopicDto) => unknown
  open: boolean
  topic: Topic
}

const validationSchema = yup
  .object()
  .shape({
    title: TOPIC_TITLE_SCHEMA,
    description: TOPIC_DESCRIPTION_SCHEMA,
  })
  .required()

export function EditTopicDialog(props: EditTopicDialogProps) {
  const { inProgress, open, onClose, onUpdate, topic } = props
  const { control, handleSubmit } = useForm<Topic>({
    resolver: yupResolver(validationSchema),
    defaultValues: topic,
  })

  const triggerEditEvent = (topic: Topic) => {
    onUpdate({
      id: topic.id,
      data: {
        title: topic.title,
        description: topic.description,
      },
    })
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(triggerEditEvent)}>
        <DialogTitle>Update Topic</DialogTitle>
        <DialogContent>
          <TextFieldCtrl
            autoFocus
            control={control}
            disabled={inProgress}
            fullWidth
            label="Title"
            name="title"
            required
            type="text"
          />
          <TextFieldCtrl
            control={control}
            disabled={inProgress}
            fullWidth
            label="Description"
            margin="normal"
            multiline
            name="description"
            required
            rows={4}
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button type="submit" disabled={inProgress} variant="contained">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
