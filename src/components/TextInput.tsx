import _ from 'lodash'
import React, { useEffect } from 'react'
import { generateId } from '../helper'
import { useTypeArea, useArticle, TextLineState } from '../contexts'

type TextInputProps = {
  proto: TextLineState
}

export function TextInput({ proto }: TextInputProps): JSX.Element {
  const { content, setContent } = useArticle()
  const { typeArea, setTypeArea } = useTypeArea()

  const { type, value, isFocus } = proto
  const textLineIndex = _.findIndex(content, proto)
  const textInputRef = React.createRef<HTMLInputElement>()
  const isEmpty = value.length === 0
  const isFirstLine = textLineIndex === 0

  useEffect(
    function elementStart() {
      return function elementDeleted() {
        setContent(function turnToText(draft) {
          draft[textLineIndex].isEdit = false
          draft[textLineIndex].isFocus = false
        })
        setTypeArea(function updateTypeAreaTop(draft) {
          draft.show = false
        })
      }
    },
    [textLineIndex, setContent, setTypeArea]
  )

  useEffect(
    function elementUpdated() {
      const textLineNode = textInputRef.current
      if (textLineNode) {
        const { top } = textLineNode.getBoundingClientRect()
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop

        if (typeArea.top !== top + scrollTop - 45 && isEmpty && isFocus) {
          setTypeArea(function updateTypeAreaTop(draft) {
            draft.top = top + scrollTop - 45
          })
        }
      }
    },
    [textInputRef, typeArea, setTypeArea, isFocus, isEmpty]
  )

  function destroySelf() {
    setContent(function turnToText(draft) {
      draft[textLineIndex].isEdit = false
      draft[textLineIndex].isFocus = false
    })
  }

  function setTypeAreaShow(status: boolean) {
    setTypeArea(function updateTypeAreaShow(draft) {
      draft.show = status
    })
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const updatedValue = e.target.value
    setContent(function updateTextLineValue(draft) {
      draft[textLineIndex].value = updatedValue
    })
  }

  function handleOnFocus() {
    if (isEmpty) {
      setTypeAreaShow(true)
      setContent(function addTextLine(draft) {
        draft[textLineIndex].isFocus = true
      })
    }
  }

  function handleOnBlur() {
    setTypeAreaShow(false)
    destroySelf()
  }

  function handleOnKeyDown(e: React.KeyboardEvent) {
    if (e.which === 13) {
      setContent(function addTextLine(draft) {
        draft[textLineIndex].isEdit = false
        draft[textLineIndex].isFocus = false
        draft.push({
          id: generateId(),
          type: 'p',
          value: '',
          isEdit: true,
          isFocus: true
        })
      })
      setTypeAreaShow(true)
    }

    if (e.which === 8) {
      if (value.length === 1) {
        setTypeAreaShow(true)
        setContent(function deleteTheLastValue(draft) {
          draft[textLineIndex].value = ''
        })
      }

      if (!isFirstLine && isEmpty) {
        const perviousLineIndex = textLineIndex - 1
        setContent(function deleteTheTextLine(draft) {
          draft[perviousLineIndex].isEdit = true
          draft[perviousLineIndex].isFocus = true
          draft.splice(textLineIndex, 1)
        })
      }
    }
  }

  function handleOnKeyUp(e: React.KeyboardEvent) {
    if (e.which !== 8 && e.which !== 13 && isEmpty) setTypeAreaShow(false)
  }

  return (
    <input
      className={`text-line__input ${type}`}
      type="text"
      ref={textInputRef}
      value={value}
      onBlur={handleOnBlur}
      autoFocus={isFocus}
      onFocus={handleOnFocus}
      onChange={handleOnChange}
      onKeyUp={handleOnKeyUp}
      onKeyDown={handleOnKeyDown}
      placeholder={textLineIndex === 0 ? 'Type here...' : 'empty line'}
    />
  )
}
