import React from 'react'

import { Box, BoxProps } from '@/components/ui/box'
import {
  CircularProgress,
  CircularProgressProps,
} from '@/components/ui/circular-progress'

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
