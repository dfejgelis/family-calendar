import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'
import { SessionProvider } from '../../contexts/SessionContext'
import { EventsProvider } from '../../contexts/EventContext'

import Home from '../../Pages/Home'
import { NotificationsProvider } from '../../contexts/NotificationsContext'

const defaultTheme = createTheme()

function App() {
  // TODO: Router?
  return (
    <NotificationsProvider>
      <SessionProvider>
        <EventsProvider>
          <ThemeProvider theme={defaultTheme}>
            <Home />
          </ThemeProvider>
        </EventsProvider>
      </SessionProvider>
    </NotificationsProvider>
  )
}

export default App
