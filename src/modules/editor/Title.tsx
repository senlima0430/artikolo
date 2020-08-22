import React from 'react'
import { useRecoilState } from 'recoil'

import { editorContentState } from '@/store/atoms'
import { Input } from '../common/Input'

export function Title() {
  const [editor, setEditorState] = useRecoilState(editorContentState)

  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    setEditorState({
      ...editor,
      title: e.currentTarget.value,
    })
  }

  return (
    <Input
      scale="large"
      type="text"
      value={editor.title}
      onChange={handleTitleChange}
      placeholder="Amazing title 🤩"
    />
  )
}
