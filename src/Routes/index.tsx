import React from 'react'
import { Router } from '@reach/router'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

export function Routes() {
  return (
    <Router style={{ height: 'calc(100vh - 48px)' }}>
      <Home path="/" />
      <NotFound default />
    </Router>
  )
}
