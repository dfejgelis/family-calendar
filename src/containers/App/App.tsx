import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'

import { EventInput } from '@fullcalendar/core'

import Login from '../Login/Login'
import usePersistantState from '../../hooks/usePersistentState'
import Chat from '../Chat/Chat'
import Calendar from '../Calendar/Calendar'

const defaultTheme = createTheme()

const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: '2',
    title: 'Timed event',
    start: `${todayStr}T12:00:00`,
    end: `${todayStr}T14:00:00`,
    allDay: false,
  },
  {
    id: '3',
    title: 'my recurring event',
    rrule: {
      freq: 'weekly',
      byweekday: ['mo', 'fr'],
      dtstart: '2024-02-01T10:30:00',
    },
    // exdate: ['2024-02-14T12:30'],
  },
  {
    id: '5',
    title: 'my event2',
    color: 'green',
    rrule: {
      freq: 'weekly',
      byweekday: ['mo', 'tu', 'we', 'fr'],
      dtstart: '2012-02-01T12:30',
    },
    // exdate: ['2024-02-14T12:30'],
  },
]
function App() {
  const [authenticated, setAuthenticated] = usePersistantState('authenticated')
  const [events, setEvents] = React.useState<EventInput[]>(INITIAL_EVENTS)

  const saveEvent = (eventFresh: EventInput) => {
    const index = events.findIndex((event) => event.id === eventFresh.id)

    if (index !== -1) {
      // Update existing eventFresh
      setEvents([...events.slice(0, index), { ...eventFresh }, ...events.slice(index + 1)])
    } else {
      setEvents([...events, eventFresh])
    }
  }

  console.log('all', events)
  return (
    <ThemeProvider theme={defaultTheme}>
      {authenticated ? (
        <>
          <Chat saveEvent={saveEvent} />
          <Calendar events={events} />
        </>
      ) : (
        <Login onSuccess={() => setAuthenticated(true)} />
      )}
    </ThemeProvider>
  )
}

export default App
