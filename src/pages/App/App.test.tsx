import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders authentication', () => {
  render(<App />)
  const linkElement = screen.getByText(/Family Calendar/i)
  expect(linkElement).toBeInTheDocument()
})
