import React from 'react'

import { Toolbar } from '@/components/ui/toolbar'
import { Typography } from '@/components/ui/typography'
import { AppBar as BaseAppBar, AppBarProps } from '@/components/ui/app-bar'

export function AppBar(props: AppBarProps) {
  return (
    <BaseAppBar position="sticky" {...props}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Chaos
        </Typography>
      </Toolbar>
    </BaseAppBar>
  )
}
