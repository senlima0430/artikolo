import React, { useEffect } from 'react'
import Routes from './Routes'

function App() {
  useEffect(() => {
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

export default App
