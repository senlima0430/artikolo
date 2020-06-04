import React from 'react'
import { useRecoilState } from 'recoil'
import { articleState } from '../hooks/atoms'
import { replaceItemAtIndex } from '../helper'

interface TextLineProps {
  id: string
  type: string
  value: string
  isEdit: boolean
}

const TextLine = React.forwardRef(function TextLine(
  { id, type, value, isEdit }: TextLineProps,
  ref
) {
  const [article, setArticle] = useRecoilState(articleState)
  const textLineProto = { id, type, value, isEdit }
  const textLineIndex = article.findIndex(
    (textLine) => textLine === textLineProto
  )

  function handleTextLineClick() {
    const newStatus = replaceItemAtIndex(article, textLineIndex, {
      ...textLineProto,
      isEdit: true
    })

    setArticle(newStatus)
  }

  return React.createElement(
    type,
    {
      ref: ref,
      onClick: handleTextLineClick
    },
    value
  )
})

export default TextLine
