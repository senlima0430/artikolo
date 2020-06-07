import React from 'react'
import { useImmer } from 'use-immer'
import { generateId } from '../helper'
import createCtx from '../hooks/createCtx'
import { TextLineState, ArticleContextType } from './types'

export const [useArticle, ArticleContextProvider] = createCtx<
  ArticleContextType
>()

export function ArticleProvider({
  children
}: React.HTMLProps<HTMLDivElement>): JSX.Element {
  const [content, setContent] = useImmer<TextLineState[]>([
    {
      id: generateId(),
      type: 'h1',
      value: 'Title',
      isEdit: false,
      isFocus: false
    },
    {
      id: generateId(),
      type: 'p',
      value: 'Tell your story',
      isEdit: false,
      isFocus: false
    }
  ])

  return (
    <ArticleContextProvider value={{ content, setContent }}>
      {children}
    </ArticleContextProvider>
  )
}
