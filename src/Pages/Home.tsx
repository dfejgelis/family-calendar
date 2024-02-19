import React from 'react'
import Login from '../containers/Login/Login'
import { SessionContext, SessionContextType } from '../contexts/SessionContext'
import { EventsContext, EventsContextType } from '../contexts/EventContext'
import Chat from '../containers/Chat/Chat'
import Calendar from '../containers/Calendar/Calendar'

const Home = () => {
  const {
    session: { user },
    setUser,
  } = React.useContext(SessionContext) as SessionContextType
  const { events, saveEvent } = React.useContext(EventsContext) as EventsContextType

  console.log('user', user)

  if (!user || events === undefined) return <Login onSuccess={() => setUser('Diego')} />

  return (
    <>
      <Chat saveEvent={saveEvent} />
      <Calendar events={events} />
    </>
  )
}

export default Home
