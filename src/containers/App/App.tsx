import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'

import { SessionProvider } from '../../contexts/SessionContext'
import Home from '../../Pages/Home'
import { EventsProvider } from '../../contexts/EventContext'

const defaultTheme = createTheme()

function App() {
  // TODO: Router?
  return (
    <SessionProvider>
      <EventsProvider>
        <ThemeProvider theme={defaultTheme}>
          <Home />
        </ThemeProvider>
      </EventsProvider>
    </SessionProvider>
  )
}

export default App
