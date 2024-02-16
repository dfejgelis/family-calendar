import React, { SyntheticEvent, useState } from 'react'
import classNames from 'classnames'
import './Login.css'

const authenticate = (passcode: string) => passcode === 'darma'

interface LoginProps {
  onSuccess: () => void
}
const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [error, setError] = useState(false)
  const [passcode, setPasscode] = useState('')

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (authenticate(passcode)) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Please enter Passcode to pass</p>
          <input
            type="text"
            autoFocus
            className={classNames('passcode', { error })}
            onChange={(e) => setPasscode(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
