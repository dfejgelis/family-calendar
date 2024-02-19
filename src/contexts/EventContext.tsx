import React, { createContext } from 'react'
import usePersistantState from '../hooks/usePersistentState'
import { EventModel } from '../models'

const intialEvents: EventModel[] = [
  {
    id: '123',
    title: 'Basket',
    familyMember: 'Julian',
    start: '2024-02-15T10:00',
    until: null,
    weekdays: ['mo', 'th'],
  },
]

export type EventsContextType = {
  events: EventModel[]
  saveEvent: (_eventForUpdate: EventModel) => EventModel
  deleteEvent: (_id: string) => void
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

  const deleteEvent = (id: string) => {
    console.log('about to delete', id)
    if (!events) return
    const index = events.findIndex((event) => event.id === id)
    if (index !== -1) setEvents([...events.slice(0, index), ...events.slice(index + 1)])
  }

  return (
    <EventsContext.Provider value={{ events: events || [], saveEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  )
}
