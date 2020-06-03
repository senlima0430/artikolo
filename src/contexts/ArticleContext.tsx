import React, { useState } from 'react'
import createCtx from '../hooks/createCtx'

type ArticleContextType = {
  content: {
    type: string
    value: string
  }[]

  setContent: (
    value: {
      type: string
      value: string
    }[]
  ) => void
}

export const [useArticle, CtxProvider] = createCtx<ArticleContextType>()

export function ArticleProvider({ children }: React.HTMLProps<HTMLDivElement>) {
  const [content, setContent] = useState([
    {
      type: 'h1',
      value: 'Title'
    },
    {
      type: 'p',
      value: 'Story here'
    }
  ])

  return <CtxProvider value={{ content, setContent }}>{children}</CtxProvider>
}
