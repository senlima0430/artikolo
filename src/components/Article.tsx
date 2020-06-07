import React from 'react'
import { TextLine } from './TextLine'
import { TypeArea } from './TypeArea'
import { useArticle } from '../contexts'

export function Article(): JSX.Element {
  const { content } = useArticle()
  return (
    <>
      <TypeArea />
      <article className="article artikolo">
        {content.map((line) => (
          <React.Fragment key={line.id}>
            <TextLine line={line} />
            <br />
          </React.Fragment>
        ))}
      </article>
    </>
  )
}
