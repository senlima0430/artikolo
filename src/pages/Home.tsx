import React, { createRef } from 'react'
import { useRecoilValue } from 'recoil'
import { RouteComponentProps } from '@reach/router'
import { articleState } from '../hooks/atoms'
import TypeArea from '../components/TypeArea'
import TextLine from '../components/TextLine'

function Home(props: RouteComponentProps) {
  const article = useRecoilValue(articleState)
  const textLineRef = createRef<HTMLDivElement>()
  const textInputPlacement = textLineRef.current?.getBoundingClientRect().y || 0

  return (
    <>
      <TypeArea top={textInputPlacement} />
      <article className="home__article markdown-body">
        {article.map((line) => (
          <TextLine
            key={line.id}
            ref={textLineRef}
            id={line.id}
            type={line.type}
            value={line.value}
            isEdit={line.isEdit}
          />
        ))}
      </article>
    </>
  )
}

export default Home
