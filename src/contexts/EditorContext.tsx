import React, { useState } from 'react'
import createCtx from '../hooks/createCtx'

type EditorContextType = {
  input: {
    top: number
    value: string
  }

  setInput: (value: { top: number; value: string }) => void
}

export const [useEditor, CtxProvider] = createCtx<EditorContextType>()

export function EditorProvider({ children }: React.HTMLProps<HTMLDivElement>) {
  const [input, setInput] = useState({
    top: 0,
    value: ''
  })

  return <CtxProvider value={{ input, setInput }}>{children}</CtxProvider>
}
