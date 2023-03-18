'use client'
import React from 'react'
import { Roboto } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AppBar } from '@/feature/app-bar'
import { Container } from '@/shared/components/container'
import { CssBaseline } from '@/shared/components/css-baseline'

import { CreateTopicAction } from './create-topic-action'
import { Providers } from './providers'

import './global-styles.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

function RootLayout(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <html lang="en" className={roboto.className}>
      <head />
      <body>
        <Providers>
          <CssBaseline />
          <AppBar />
          <Container sx={{ flex: '1' }}>
            {children}
            <CreateTopicAction />
          </Container>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
