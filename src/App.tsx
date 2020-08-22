import React from 'react'
import { Router } from '@reach/router'

import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

export function App() {
  React.useEffect(function detectBackspaceOnBody() {
    window.onkeydown = function (e: KeyboardEvent) {
      if (e.keyCode === 8 && e.target === document.body) e.preventDefault()
    }
  }, [])

  return (
    <Router>
      <Home path="/" />
      <NotFound default />
    </Router>
  )
}
