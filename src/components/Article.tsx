import React from 'react'
import { useRecoilValue } from 'recoil'
import { articleState } from '../hooks/atoms'
import TextLine from './TextLine'

function Article() {
  const article = useRecoilValue(articleState)

  return (
    <article className="article markdown-body">
      {article.map((line) => (
        <TextLine key={line.id} line={line} />
      ))}
    </article>
  )
}

export default Article
