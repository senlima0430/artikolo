import React, { createRef } from 'react'
import { useRecoilState } from 'recoil'
import { RouteComponentProps } from '@reach/router'
import { replaceItemAtIndex } from '../helper'
import { articleState } from '../hooks/atoms'
import TypeArea from '../components/TypeArea'
import TextLine from '../components/TextLine'
import TextInput from '../components/TextInput'

function Home(props: RouteComponentProps) {
  const [article, setArticle] = useRecoilState(articleState)
  const textLineRef = createRef<HTMLDivElement>()
  const textInputPlacement = textLineRef.current?.getBoundingClientRect().y || 0

  return (
    <>
      <TypeArea top={textInputPlacement} />
      <article className="home__article markdown-body">
        {article.map((line) => (
          <React.Fragment key={line.id}>
            {line.isEdit && (
              <TextInput
                id={line.id}
                type={line.type}
                placement={textInputPlacement}
                value={line.value}
                handleTextInputOnChange={function handleTextInputOnChange(
                  e: React.ChangeEvent<HTMLInputElement>
                ) {
                  e.preventDefault()

                  const targetIndex = article.findIndex(
                    (textLine) => textLine === line
                  )

                  const newArticle = replaceItemAtIndex(article, targetIndex, {
                    ...line,
                    value: e.target.value
                  })

                  setArticle(newArticle)
                }}
              />
            )}
            <TextLine
              ref={textLineRef}
              id={line.id}
              type={line.type}
              value={line.value}
              isEdit={line.isEdit}
            />
          </React.Fragment>
        ))}
      </article>
    </>
  )
}

export default Home
