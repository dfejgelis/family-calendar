import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import logo from './logo.svg'
import './App.css'
import Login from '../../components/Login/Login'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

function App() {
  const [authenticated, setAuthenticated] = React.useState(false)

  if (!authenticated) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Login onSuccess={() => setAuthenticated(true)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
