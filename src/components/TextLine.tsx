import _ from 'lodash'
import React from 'react'
import { useRecoilState } from 'recoil'
import update from 'immutability-helper'
import { articleState } from '../hooks/atoms'
import { generateId } from '../helper'
import TypeArea from './TypeArea'

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
    if (article.length === 1) return false

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
      const updatedLine = update(textLineProto, {
        isEdit: { $set: false }
      })
      const newArticle = update(article, {
        $push: [
          {
            id: generateId(),
            type: 'p',
            value: 'New line...',
            isEdit: true
          }
        ],
        $splice: [[textLineIndex, 1, updatedLine]]
      })

      setArticle(newArticle)
    }
  }

  return isEdit
    ? React.createElement(
        React.Fragment,
        null,
        React.createElement(
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
            placeholder:
              article.length === 1 && value.length === 0 ? 'Title' : ''
          },
          null
        ),
        value.length === 0 && React.createElement(TypeArea, { top: 0 }, null)
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
