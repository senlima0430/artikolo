import React from 'react'
import './App.css'

import { ArticleProvider } from './contexts/ArticleContext'

import TextArea from './components/TextArea'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Artikolo</h1>
      </header>
      <ArticleProvider>
        <main className="App-main">
          <article>
            <TextArea />
          </article>
        </main>
      </ArticleProvider>
    </div>
  )
}

export default App
