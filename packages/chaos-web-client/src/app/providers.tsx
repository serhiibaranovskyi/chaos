'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

import { theme, ThemeProvider } from '@/shared/styles'
import { TopicActionsProvider } from '@/shared/context/topic-actions'

import '@/mocks/handlers'

export function Providers(props: React.PropsWithChildren) {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient({}))

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <TopicActionsProvider>{children}</TopicActionsProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
