import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import './TypeArea.css'

interface TypeAreaProps {
  top: number
  left: number
}

function TypeArea({ top, left }: TypeAreaProps) {
  const [areaToggle, setToggle] = useState(false)

  function handleToolToggle() {
    setToggle(!areaToggle)
  }

  return (
    <div
      className="type-area__base"
      style={{ top: `${top}px`, left: `${left / 2}px` }}
    >
      <button
        className={`type-area__button ${areaToggle ? 'is_activate' : ''}`}
        type="button"
        onClick={handleToolToggle}
      >
        <IoIosAdd />
      </button>
    </div>
  )
}

export default TypeArea
