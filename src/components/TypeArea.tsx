import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { IoIosAdd } from 'react-icons/io'
import { typeAreaState } from '../hooks/atoms'

function TypeArea() {
  const typeArea = useRecoilValue(typeAreaState)
  const [areaToggle, setToggle] = useState(false)

  function handleToolToggle() {
    setToggle(!areaToggle)
  }

  return (
    <div className="type-area__base" style={{ top: `${typeArea.top}px` }}>
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
