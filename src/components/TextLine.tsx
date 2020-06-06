import _ from 'lodash'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import update from 'immutability-helper'
import { articleState, typeAreaState } from '../hooks/atoms'
import { generateId } from '../helper'
import TypeArea from './TypeArea'

interface TextLineProps {
  id: string
  type: string
  value: string
  isEdit: boolean
}

function TextLine({ id, type, value, isEdit }: TextLineProps) {
  const [article, setArticle] = useRecoilState(articleState)
  const [typeArea, setTypeArea] = useRecoilState(typeAreaState)
  const [goDelete, prepareDelete] = useState(false)

  const textLineProto = { id, type, value, isEdit }
  const textLineRef = React.createRef<HTMLInputElement>()
  const textLineIndex = _.findIndex(article, textLineProto)
  const textLineInputRef = React.createRef<HTMLInputElement>()

  const isLastLine = article.length === 1
  const isFirstLine = textLineIndex === 0
  const isEmptyValue = value.length === 0

  function setTypeAreaShow(status: boolean) {
    if (textLineInputRef.current) {
      const { top } = textLineInputRef.current.getBoundingClientRect()

      setTypeArea({
        show: status,
        top: status ? (isFirstLine ? 0 : top - 48) : 0
      })
    }
  }

  function setFocusTextLine(status: boolean) {
    const textLineFocus = update(textLineProto, {
      isEdit: { $set: status }
    })
    const updatedArticle = update(article, {
      $splice: [[textLineIndex, 1, textLineFocus]]
    })

    setArticle(updatedArticle)
  }

  // * When plain text clicked, turn to <input />
  function handleTextLineClick() {
    setFocusTextLine(true)
  }

  // * When <input /> focus && value is empty, show TypeArea
  function handleTextLineFocus() {
    setTypeAreaShow(isEmptyValue)
  }

  // * When <input /> blur, hide TypeArea
  // * But if is first line, don't hide
  function handleTextLineBlur() {
    setTypeAreaShow(false)
    if (!isLastLine) setFocusTextLine(false)
    if (isFirstLine) setFocusTextLine(true)
  }

  // * Update <input /> value
  function handleTextLineChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (goDelete && e.target.value.length === 1) prepareDelete(false)
    if (isEmptyValue) setTypeAreaShow(true)

    const updatedLine = update(textLineProto, {
      value: { $set: e.target.value }
    })
    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, updatedLine]]
    })

    setArticle(newArticle)
  }

  function handleTextLineKeyUp(e: React.KeyboardEvent) {
    e.preventDefault()
    // * Add a line to article
    if (e.key === 'Enter') {
      const updatedLine = update(textLineProto, {
        isEdit: { $set: true }
      })
      const updatedArticle = update(article, {
        $splice: [[textLineIndex, 1, updatedLine]]
      })
      const newArticle = update(updatedArticle, {
        $push: [
          {
            id: generateId(),
            type: 'p',
            value: '',
            isEdit: true
          }
        ]
      })

      setArticle(newArticle)
    }

    if (e.key === 'Backspace' && isEmptyValue) {
      if (!goDelete) {
        setTypeAreaShow(true)
        prepareDelete(true)
      }

      // * Reset previous line's focus state and delete line
      if (goDelete && !isFirstLine) {
        setTypeAreaShow(false)
        const perviousLineIndex = textLineIndex - 1

        const updatePreviousLine = update(article[perviousLineIndex], {
          isEdit: { $set: false }
        })
        const resetArticle = update(article, {
          $splice: [[perviousLineIndex, 1, updatePreviousLine]]
        })
        setArticle(resetArticle)

        const resetPreviousLine = update(resetArticle[perviousLineIndex], {
          isEdit: { $set: true }
        })
        const updateArticle = update(resetArticle, {
          $splice: [[perviousLineIndex, 1, resetPreviousLine]]
        })
        setArticle(updateArticle)

        const newArticle = update(updateArticle, {
          $splice: [[textLineIndex, 1]]
        })
        setArticle(newArticle)
      }
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
            onFocus: handleTextLineFocus,
            onKeyUp: handleTextLineKeyUp,
            onChange: handleTextLineChange,
            placeholder: isFirstLine && isEmptyValue ? 'Title' : ''
          },
          null
        ),
        isEmptyValue &&
          typeArea.show &&
          React.createElement(TypeArea, null, null)
      )
    : React.createElement(
        type,
        {
          ref: textLineRef,
          onClick: handleTextLineClick
        },
        value
      )
}

export default TextLine
