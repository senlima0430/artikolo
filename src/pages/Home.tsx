import React from 'react'
import { useRecoilValue } from 'recoil'
import { RouteComponentProps } from '@reach/router'
import { articleState } from '../hooks/atoms'
import TextLine from '../components/TextLine'

function Home(props: RouteComponentProps) {
  const article = useRecoilValue(articleState)

  return (
    <article className="home__article markdown-body">
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

export default Home
