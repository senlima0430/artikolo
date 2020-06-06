import _ from 'lodash'
import React from 'react'
import { useRecoilState } from 'recoil'
import update from 'immutability-helper'
import { generateId } from '../helper'
import { articleState } from '../hooks/atoms'
import { TextLineState } from '../hooks/types'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  proto: TextLineState
  setTypeAreaRender: (status: boolean) => void
}

const TextInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps & React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput(
  { proto, setTypeAreaRender, ...restProps }: TextInputProps,
  ref
) {
  const [article, setArticle] = useRecoilState(articleState)

  const textLineIndex = _.findIndex(article, proto)
  const isEmpty = proto.value.length === 0

  function destroySelf() {
    const updatedArticle = update(article, {
      $splice: [[textLineIndex, 1, { ...proto, isEdit: false }]]
    })

    setArticle(updatedArticle)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (isEmpty) setTypeAreaRender(true)

    const newArticle = update(article, {
      $splice: [[textLineIndex, 1, { ...proto, value: e.target.value }]]
    })

    setArticle(newArticle)
  }

  function handleOnFocus() {
    if (isEmpty) setTypeAreaRender(true)
  }

  function handleOnBlur() {
    if (textLineIndex === 0 && isEmpty) {
      return
    }

    if (isEmpty) setTypeAreaRender(false)
    if (article.length > 1) destroySelf()
  }

  function handleOnKeyDown(e: React.KeyboardEvent) {
    if (e.which === 13) {
      const updatedArticle = update(article, {
        $splice: [[textLineIndex, 1, { ...proto, isEdit: false }]]
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

    if (e.which === 8) {
      if (textLineIndex !== 0 && isEmpty) {
        setTypeAreaRender(false)
        const perviousLineIndex = textLineIndex - 1
        const previousLine = article[perviousLineIndex]

        const resetArticle = update(article, {
          $splice: [[perviousLineIndex, 1, { ...previousLine, isEdit: false }]]
        })
        setArticle(resetArticle)

        const updateArticle = update(resetArticle, {
          $splice: [[perviousLineIndex, 1, { ...previousLine, isEdit: true }]]
        })
        setArticle(updateArticle)

        const newArticle = update(updateArticle, {
          $splice: [[textLineIndex, 1]]
        })
        setArticle(newArticle)
      }
    }
  }

  return (
    <input
      className={`text-line__input ${proto.type}`}
      type="text"
      autoFocus
      ref={ref}
      value={proto.value}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      placeholder={textLineIndex === 0 ? 'Type here...' : ''}
      {...restProps}
    />
  )
})

export default TextInput
