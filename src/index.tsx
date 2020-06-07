import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import { App } from './App'
import { ArticleProvider, TypeAreaProvider } from './contexts'
// import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ArticleProvider>
    <TypeAreaProvider>
      <App />
    </TypeAreaProvider>
  </ArticleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
