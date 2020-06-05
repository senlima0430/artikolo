import React from 'react'

interface TextInputProps {
  id: string
  type: string
  placement: number
  value: string
  handleTextInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function TextInput({
  id,
  type,
  placement,
  value,
  handleTextInputOnChange
}: TextInputProps) {
  return (
    <input
      type="text"
      autoFocus
      className={`text-input ${type}`}
      value={value}
      style={{ top: `${placement}px` }}
      onChange={handleTextInputOnChange}
      placeholder={id === 'article-line-1' ? 'Title here..' : ''}
    />
  )
}

export default TextInput
