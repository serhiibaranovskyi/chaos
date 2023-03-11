'use client'

import React, { useEffect } from 'react'

import { Box } from '@/shared/components/box'
import { Button } from '@/shared/components/button'
import { Typography } from '@/shared/components/typography'
import { useDefaultErrorHandler } from '@/api/react-query/common'

type ErrorProps = {
  error: Error
  reset: () => void
}

function Error(props: ErrorProps) {
  const { error, reset } = props
  const errorHandler = useDefaultErrorHandler()

  useEffect(() => {
    errorHandler(error)
  }, [errorHandler, error])

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography align="center" color="error" variant="h3">
        Something went wrong 😿
      </Typography>
      <Button onClick={() => reset()} sx={{ mt: 2 }} variant="contained">
        Try again
      </Button>
    </Box>
  )
}

export default Error
