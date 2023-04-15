'use client'
import React from 'react'
import { useController, useForm } from 'react-hook-form'
import { useMeasure } from 'react-use'
import type { JsonArray, JsonObject } from 'type-fest'

import { Button } from '@/shared/components/button'
import { Dialog } from '@/shared/components/dialog'
import { DialogActions } from '@/shared/components/dialog-actions'
import { DialogContent } from '@/shared/components/dialog-content'
import { DialogTitle } from '@/shared/components/dialog-title'
import { JsonEditor, JsonEditorValue } from 'src/shared/components/json-editor'

export type FormValues<TPayload = JsonObject | JsonArray> = {
  payload: TPayload
}

export type CreateTopicDialogProps = {
  inProgress: boolean
  onClose: () => unknown
  onPublish: (data: FormValues) => unknown
  open: boolean
}

export function CreateEventDialog(props: CreateTopicDialogProps) {
  const { inProgress, open, onClose, onPublish } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit } = useForm<FormValues<any>>({
    defaultValues: { payload: '{}' },
  })
  const { field: payloadField } = useController({ control, name: 'payload' })
  const [dialogContentRef, dialogContentMeasure] = useMeasure()

  const submitHandler = (values: FormValues<JsonEditorValue>) => {
    return onPublish({
      ...values,
      payload: values.payload.jsObject,
    })
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle>Publish New Event</DialogTitle>
        <DialogContent ref={dialogContentRef}>
          {dialogContentMeasure.width > 0 && (
            <JsonEditor
              onChange={payloadField.onChange}
              height="300px"
              width={`${dialogContentMeasure.width}px`}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              inProgress ||
              !payloadField.value.jsObject ||
              Boolean(payloadField.value.error)
            }
            variant="contained"
          >
            Publish
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
