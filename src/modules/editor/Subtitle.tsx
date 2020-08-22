import React from 'react'
import { useRecoilState } from 'recoil'

import { editorContentState } from '@/store/atoms'
import { Input } from '../common/Input'

export function Subtitle() {
  const [editor, setEditorState] = useRecoilState(editorContentState)

  function handleSubtitleChange(e: React.FormEvent<HTMLInputElement>) {
    setEditorState({
      ...editor,
      subtitle: e.currentTarget.value,
    })
  }

  return (
    <Input
      type="text"
      value={editor.subtitle}
      onChange={handleSubtitleChange}
      placeholder="About your article 🤔"
    />
  )
}
