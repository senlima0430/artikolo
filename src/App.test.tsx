import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders application title', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Artikolo/i)
  expect(linkElement).toBeInTheDocument()
})
