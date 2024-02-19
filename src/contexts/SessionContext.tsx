import React, { createContext } from 'react'
import { FamilyMemberModel } from '../models'
import usePersistantState from '../hooks/usePersistentState'

export interface ISession {
  user: string | null
  family: FamilyMemberModel[]
}

const initialSession: ISession = {
  user: null,
  family: [
    { name: 'Diego', color: 'green', description: 'parent (user)' },
    { name: 'Celeste', color: 'blue', description: 'parent' },
    { name: 'Sol', color: 'orange', description: 'Sol' },
    { name: 'Julian', color: 'purple', description: 'Julian' },
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
