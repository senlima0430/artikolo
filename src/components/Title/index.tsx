import React, { useState } from 'react'
import './Title.css'

function Title(): JSX.Element {
  const [title, setTitle] = useState('')

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <input
      className="title"
      type="text"
      value={title}
      onChange={handleTitle}
      placeholder="Title here"
    />
  )
}

export default Title
