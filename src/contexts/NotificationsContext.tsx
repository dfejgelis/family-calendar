import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'

export type NotificationsContextType = {
  showNotification: (_newMessage: string, _newSeverity: string) => void
}

export const NotificationContext = React.createContext<NotificationsContextType | null>(null)

export const NotificationsProvider = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [severity, setSeverity] = React.useState('info')

  const showNotification = (newMessage: string, newSeverity: string = 'info') => {
    setMessage(newMessage)
    setSeverity(newSeverity)
    setOpen(true)
  }

  const hideNotification = () => {
    setOpen(false)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={hideNotification}
          // @ts-ignore
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}
