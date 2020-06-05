import _ from 'lodash'
import React from 'react'
import { useRecoilState } from 'recoil'
import update from 'immutability-helper'
import { articleState } from '../hooks/atoms'
import { generateId } from '../helper'

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
  const textLineIndex = _.findIndex(article, textLineProto)
  const textLineInputRef = React.createRef<HTMLInputElement>()

  function handleTextLineClick() {
    const updatedLine = update(textLineProto, {
      isEdit: { $set: true }
    })
    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, updatedLine]]
    })

    setArticle(newArticle)
  }

  function handleTextLineBlur() {
    const updatedLine = update(textLineProto, {
      isEdit: { $set: false }
    })
    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, updatedLine]]
    })

    setArticle(newArticle)
  }

  function handleTextLineChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const updatedLine = update(textLineProto, {
      value: { $set: e.target.value }
    })
    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, updatedLine]]
    })

    setArticle(newArticle)
  }

  function handleTextLineEnter(e: React.KeyboardEvent) {
    e.preventDefault()
    if (e.key === 'Enter') {
      const newArticle = update(article, {
        $push: [
          {
            id: generateId(),
            type: 'p',
            value: 'New line...',
            isEdit: false
          }
        ]
      })

      setArticle(newArticle)
    }
  }

  return isEdit
    ? React.createElement(
        'input',
        {
          className: `text-line__input ${type}`,
          type: 'text',
          ref: textLineInputRef,
          value: value,
          autoFocus: true,
          onBlur: handleTextLineBlur,
          onChange: handleTextLineChange,
          onKeyUp: handleTextLineEnter,
          placeholder: textLineIndex === 0 ? 'Title here..' : ''
        },
        null
      )
    : React.createElement(
        type,
        {
          ref: ref,
          onClick: handleTextLineClick
        },
        value
      )
})

export default TextLine
