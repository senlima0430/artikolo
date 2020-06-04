import React from 'react'
import './App.css'

import { ArticleProvider } from './contexts/ArticleContext'
import { EditorProvider } from './contexts/EditorContext'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Artikolo</h1>
      </header>
      <EditorProvider>
        <ArticleProvider>
          <main className="App-main">
            <article />
          </main>
        </ArticleProvider>
      </EditorProvider>
    </div>
  )
}

export default App
