import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0ea5e9' }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: { root: { textTransform: 'none', borderRadius: 12 } }
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'
  }
})

export default theme
