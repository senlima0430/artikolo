import React from 'react'
import { useRecoilValue } from 'recoil'
import { RouteComponentProps } from '@reach/router'
import { articleState } from '../hooks/atoms'
import TextLine from './TextLine'

function Article(props: RouteComponentProps) {
  const article = useRecoilValue(articleState)

  return (
    <article className="article markdown-body">
      {article.map((line) => (
        <TextLine
          key={line.id}
          id={line.id}
          type={line.type}
          value={line.value}
          isEdit={line.isEdit}
        />
      ))}
    </article>
  )
}

export default Article
