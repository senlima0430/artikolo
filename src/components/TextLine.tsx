import _ from 'lodash'
import React from 'react'
import { useRecoilState } from 'recoil'
import update from 'immutability-helper'
import { TextLineState } from '../hooks/types'
import { articleState, typeAreaState } from '../hooks/atoms'
import TypeArea from './TypeArea'
import TextInput from './TextInput'

interface TextLineProps {
  line: TextLineState
}

function TextLine({ line }: TextLineProps) {
  const [article, setArticle] = useRecoilState(articleState)
  const [typeArea, setTypeArea] = useRecoilState(typeAreaState)

  const { type, value, isEdit } = line
  const textLineIndex = _.findIndex(article, line)
  const textLineInputRef = React.createRef<HTMLInputElement>()

  const isFirstLine = textLineIndex === 0
  const isEmptyValue = value.length === 0

  function setTypeAreaRender(status: boolean) {
    if (textLineInputRef.current) {
      const { top } = textLineInputRef.current.getBoundingClientRect()

      setTypeArea({
        show: status,
        top: status ? (isFirstLine ? 18 : top - 48) : 0
      })
    }
  }

  function handleTextLineClick() {
    if (isEmptyValue && !typeArea.show) setTypeAreaRender(true)
    const updatedArticle = update(article, {
      $splice: [[textLineIndex, 1, { ...line, isEdit: true }]]
    })

    setArticle(updatedArticle)
  }

  return isEdit ? (
    <>
      <TextInput
        ref={textLineInputRef}
        proto={line}
        setTypeAreaRender={setTypeAreaRender}
      />
      {value.length === 0 && typeArea.show && <TypeArea />}
    </>
  ) : (
    React.createElement(
      type,
      {
        onClick: handleTextLineClick
      },
      value
    )
  )
}

export default TextLine
