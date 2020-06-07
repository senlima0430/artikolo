import _ from 'lodash'
import React from 'react'
import { TextInput } from './TextInput'
import { useArticle, TextLineState } from '../contexts'

type TextLineProps = {
  line: TextLineState
}

export function TextLine({ line }: TextLineProps): JSX.Element {
  const { content, setContent } = useArticle()

  const { type, value, isEdit } = line
  const textLineIndex = _.findIndex(content, line)

  function handleTextLineClick() {
    setContent(function turnToInput(draft) {
      draft[textLineIndex].isEdit = true
      draft[textLineIndex].isFocus = true
    })
  }

  return isEdit ? (
    <TextInput proto={line} />
  ) : (
    React.createElement(type, { onClick: handleTextLineClick }, value)
  )
}
