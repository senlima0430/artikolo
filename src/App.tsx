import React from 'react'
import { Routes } from './Routes'

export function App() {
  React.useEffect(function detectBackspaceOnBody() {
    window.onkeydown = function (e: KeyboardEvent) {
      if (e.keyCode === 8 && e.target === document.body) e.preventDefault()
    }
  }, [])

  return (
    <div className="App">
      <main className="App-main">
        <Routes />
      </main>
    </div>
  )
}
