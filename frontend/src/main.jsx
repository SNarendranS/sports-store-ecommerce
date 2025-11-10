import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          color: '#554a4aff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            cursor: 'pointer',
          },
          alignSelf:'center'
        },
      },
    },
  },
});


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
          <App />

    </Provider>
  </ThemeProvider>
)
