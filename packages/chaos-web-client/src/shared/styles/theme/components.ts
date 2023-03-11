import type { Components } from '@mui/material/styles'

export type { Components } from '@mui/material/styles'

export const components: Components = {
  MuiContainer: {
    styleOverrides: {
      root: {
        '@media (min-width: 600px)': {
          padding: '16px 32px',
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'standard',
    },
  },
  MuiToolbar: {
    styleOverrides: {
      gutters: {
        '@media (min-width: 600px)': {
          paddingLeft: '32px',
          paddingRight: '32px',
        },
      },
    },
  },
}
