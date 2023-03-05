'use client'
import { useCallback } from 'react'
import { useLatest } from 'react-use'
import { useSnackbar } from 'notistack'

export function useDefaultErrorHandler() {
  const { enqueueSnackbar } = useSnackbar()
  const enqueueSnackbarRef = useLatest(enqueueSnackbar)

  return useCallback(
    (error: unknown) => {
      enqueueSnackbarRef.current(
        (error as Error)?.message ?? 'Something went wrong',
        { variant: 'error' }
      )
    },
    [enqueueSnackbarRef]
  )
}
