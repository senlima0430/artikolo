import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Title from '.'

describe('<Title />', () => {
  test('render correctly', () => {
    const { getByPlaceholderText } = render(<Title />)
    const inputElement = getByPlaceholderText('Title here')
    expect(inputElement).toBeInTheDocument()
  })

  test('input change render different input value', () => {
    const { getByPlaceholderText } = render(<Title />)
    const inputElement = getByPlaceholderText('Title here')

    if (inputElement instanceof HTMLInputElement) {
      expect(inputElement.value).toBe('')
      fireEvent.change(inputElement, { target: { value: 'test' } })
      expect(inputElement.value).toBe('test')
    }
  })
})
