import { HTMLProps } from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'

type SizeOptions = 'default' | 'large'

const inputSizeStyle = variant({ prop: 'scale', key: 'inputs.size' })

interface InputProps extends HTMLProps<HTMLInputElement> {
  scale?: SizeOptions
}

export const Input = styled.input<InputProps>`
  outline: 0;
  border-width: 0;
  border-style: solid;
  border-bottom-color: black;
  transition: all 0.16s ease-in-out;
  ${inputSizeStyle}

  &:hover {
    border-bottom-color: #37f570;
  }

  &:focus {
    border-bottom-color: #37f570;
  }

  &::placeholder {
    color: #c4c4c4;
  }
`

Input.defaultProps = {
  scale: 'default',
}
