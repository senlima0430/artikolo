import { createRef, createElement } from 'react'
import { useEditor } from '../../contexts/EditorContext'

interface TextLineProps {
  type: string
  value: string
}

function TextLine({ type, value }: TextLineProps) {
  const { input, setInput } = useEditor()
  const textLineRef = createRef()

  return createElement(
    type,
    {
      ref: textLineRef,
      onClick: () => {
        setInput({
          value: value,
          ...input
        })
      }
    },
    value
  )
}

export default TextLine
