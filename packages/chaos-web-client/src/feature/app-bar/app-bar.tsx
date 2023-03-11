'use client'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLatest } from 'react-use'

import { alpha, styled } from '@/shared/styles'
import { AppBar as BaseAppBar, AppBarProps } from '@/shared/components/app-bar'
import { Box } from '@/shared/components/box'
import { InputBase } from '@/shared/components/input-base'
import { Link } from '@/shared/components/link'
import { SearchIcon } from '@/shared/components/icons'
import { Toolbar } from '@/shared/components/toolbar'
import { useTopicActionsContext } from '@/shared/context/topic-actions'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginRight: 0,
  width: '100%',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  pointerEvents: 'none',
  position: 'absolute',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export function AppBar(props: AppBarProps) {
  const { searchTerm, setSearchTerm } = useTopicActionsContext()
  const pathnameRef = useLatest(usePathname())
  const routerRef = useLatest(useRouter())

  useEffect(() => {
    if (searchTerm && pathnameRef.current !== '/topics') {
      routerRef.current.push('/topics')
    }
  }, [searchTerm, pathnameRef, routerRef])

  return (
    <BaseAppBar position="sticky" {...props}>
      <Toolbar>
        <Link
          component={NextLink}
          color="common.white"
          href="/"
          minWidth="72px"
          noWrap
          sx={{ textDecoration: 'none' }}
          variant="h6"
        >
          Chaos
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value ?? '')}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Toolbar>
    </BaseAppBar>
  )
}
