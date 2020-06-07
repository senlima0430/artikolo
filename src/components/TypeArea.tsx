import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useTypeArea } from '../contexts'

export function TypeArea(): JSX.Element {
  const { typeArea } = useTypeArea()
  return (
    <div
      className="type-area__base"
      style={{
        top: `${typeArea.top}px`,
        display: typeArea.show ? 'block' : 'none'
      }}
    >
      <button
        className={`type-area__button ${false ? 'is_activate' : ''}`}
        type="button"
      >
        <IoIosAdd />
      </button>
    </div>
  )
}
