import React from 'react'
import { Roboto } from '@next/font/google'

import { AppBar } from '@/components/common/app-bar'
import { Container } from '@/components/ui/container'
import { CssBaseline } from '@/components/ui/css-baseline'

import { Providers } from './providers'

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
          <Container sx={{ flex: '1', py: 2 }}>{children}</Container>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
