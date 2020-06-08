import React from 'react'
import { Router } from '@reach/router'
import { Home, NotFound } from '../pages'

export function Routes() {
  return (
    <Router style={{ height: 'calc(100vh - 48px)' }}>
      <Home path="/" />
      <NotFound default />
    </Router>
  )
}
