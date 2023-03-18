'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

import { theme, ThemeProvider } from '@/shared/styles'
import { TopicActionsProvider } from '@/shared/context/topic-actions'
import { CHAOS_BASE_URL, USE_MOCKS } from '@/shared/config'

if (USE_MOCKS) {
  require('@/mocks/handlers')
}

if (!CHAOS_BASE_URL) {
  throw new Error('CHAOS_BASE_URL is not provided')
}

export function Providers(props: React.PropsWithChildren) {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient({}))

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        maxSnack={3}
      >
        <QueryClientProvider client={queryClient}>
          <TopicActionsProvider>{children}</TopicActionsProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
