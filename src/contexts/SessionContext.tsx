import React, { createContext } from 'react'
import { IFamilyCalendarPromptContextFamilyMember } from '../lib/ai/prompts/familyCalendar'
import usePersistantState from '../hooks/usePersistentState'

export interface ISession {
  user: string | null
  family: IFamilyCalendarPromptContextFamilyMember[]
}

const initialSession: ISession = {
  user: null,
  family: [
    { name: 'Diego', description: 'parent (user)' },
    { name: 'Celeste', description: 'parent' },
    { name: 'Sol', description: 'Sol' },
    { name: 'Julian', description: 'Julian' },
  ],
}

export type SessionContextType = {
  session: ISession
  setUser: (_user: string) => void
}

export const SessionContext = createContext<SessionContextType | null>(null)

interface SessionProviderProps {
  children?: React.ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [family] = React.useState(initialSession.family)
  const [user, setUser] = usePersistantState('authenticated', initialSession.user)

  return (
    <SessionContext.Provider value={{ session: { user: user || null, family }, setUser }}>
      {children}
    </SessionContext.Provider>
  )
}
