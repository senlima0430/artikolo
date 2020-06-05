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

  function handleTextLineClick() {
    const updatedLine = update(textLineProto, {
      isEdit: { $set: true }
    })
    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, updatedLine]]
    })

    setArticle(newArticle)
  }

  function handleTextLineFocus() {
    if (value.length === 0 && textLineInputRef.current) {
      const { top } = textLineInputRef.current.getBoundingClientRect()
      setTypeArea({
        show: true,
        top: textLineIndex === 0 ? 0 : top - 48
      })
    }
  }

  function handleTextLineBlur() {
    setTypeArea({
      show: false,
      top: 0
    })

    if (article.length === 1 || value.length === 0) return false

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

    if (value.length === 0 && textLineInputRef.current) {
      const { top } = textLineInputRef.current.getBoundingClientRect()
      setTypeArea({
        show: true,
        top: textLineIndex === 0 ? 0 : top - 48
      })
    }

    setArticle(newArticle)
  }

  function handleTextLineEnter(e: React.KeyboardEvent) {
    e.preventDefault()
    if (e.key === 'Enter') {
      const updatedLine = update(textLineProto, {
        isEdit: { $set: textLineIndex === 0 }
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

    // TODO: WHAT THE FUCK WITH THAT SHIT
    if (e.key === 'Backspace' && value.length === 0) {
      if (article.length === 1) e.preventDefault()
      if (!goDelete) prepareDelete(true)

      if (goDelete) {
        const updatedLastLine = update(article[textLineIndex - 1], {
          isEdit: { $set: false }
        })
        const firstStep = update(article, {
          $splice: [[textLineIndex - 1, 1, updatedLastLine]]
        })
        setArticle(firstStep)

        const focusLastLine = update(firstStep[textLineIndex - 1], {
          isEdit: { $set: true }
        })
        const secondStep = update(firstStep, {
          $splice: [[textLineIndex - 1, 1, focusLastLine]]
        })
        setArticle(secondStep)

        const updatedArticle = update(secondStep, {
          $splice: [[textLineIndex, 1]]
        })

        setArticle(updatedArticle)
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
            onChange: handleTextLineChange,
            onKeyUp: handleTextLineEnter,
            placeholder:
              article.length === 1 && value.length === 0 ? 'Title' : ''
          },
          null
        ),
        value.length === 0 &&
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
