import React, { createContext } from 'react'
import usePersistantState from '../hooks/usePersistentState'
import { EventModel } from '../models'

const intialEvents: EventModel[] = []

export type EventsContextType = {
  events: EventModel[]
  saveEvent: (_eventForUpdate: EventModel) => EventModel
}

export const EventsContext = createContext<EventsContextType | null>(null)

interface EventsProviderProps {
  children?: React.ReactNode
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = usePersistantState<EventModel[]>('events', intialEvents)

  const saveEvent = (eventForUpdate: EventModel) => {
    if (!events) return eventForUpdate

    console.log('saveEvent', eventForUpdate)
    const eventFresh = eventForUpdate
    if (!eventFresh.id) eventFresh.id = (events.length + 1).toString()

    const index = events.findIndex((event) => event.id === eventFresh.id)
    if (index !== -1) {
      // Update existing with new one
      setEvents([...events.slice(0, index), { ...eventFresh }, ...events.slice(index + 1)])
    } else {
      setEvents([...events, eventFresh])
    }
    return eventFresh
  }

  return (
    <EventsContext.Provider value={{ events: events || [], saveEvent }}>
      {children}
    </EventsContext.Provider>
  )
}
