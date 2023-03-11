import React from 'react'

import { Box, BoxProps } from '@/shared/components/box'
import {
  CircularProgress,
  CircularProgressProps,
} from '@/shared/components/circular-progress'

export type PageLoaderProps = BoxProps & {
  CircularProgressProps?: CircularProgressProps
}

export function PageLoader(props: PageLoaderProps) {
  const { CircularProgressProps, ...other } = props

  return (
    <Box
      alignItems="center"
      display="flex"
      height="100%"
      justifyContent="center"
      width="100%"
      {...other}
    >
      <CircularProgress size={50} thickness={4} {...CircularProgressProps} />
    </Box>
  )
}
