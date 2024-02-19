import React from 'react'
import Login from '../containers/Login/Login'
import { SessionContext, SessionContextType } from '../contexts/SessionContext'
import { EventsContext, EventsContextType } from '../contexts/EventContext'
import Chat from '../containers/Chat/Chat'
import Calendar from '../containers/Calendar/Calendar'

const Home = () => {
  const { session, setUser } = React.useContext(SessionContext) as SessionContextType
  const eventsContext = React.useContext(EventsContext) as EventsContextType

  if (!session.user || eventsContext.events === undefined)
    return <Login onSuccess={() => setUser('Diego')} />

  return (
    <>
      <Chat {...eventsContext} session={session} />
      <Calendar {...eventsContext} session={session} />
    </>
  )
}

export default Home
