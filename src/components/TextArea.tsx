import React, { useEffect, createElement } from 'react'
import { render } from 'react-dom'
import './TextArea.css'
import { useArticle } from '../contexts/ArticleContext'

function TextArea() {
  const { content } = useArticle()

  useEffect(() => {
    render(
      createElement(
        React.Fragment,
        null,
        content.map(function (line) {
          return createElement(line.type, null, line.value)
        })
      ),
      document.getElementById('text-area_root')
    )
  }, [content])

  return (
    <div id="text-area_root" className="text-area__wrapper markdown-body" />
  )
}

export default TextArea
