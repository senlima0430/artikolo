import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'

interface TypeAreaProps {
  top: number
}

function TypeArea({ top }: TypeAreaProps) {
  const [areaToggle, setToggle] = useState(false)

  function handleToolToggle() {
    setToggle(!areaToggle)
  }

  return (
    <div className="type-area__base" style={{ top: `${top}px` }}>
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
