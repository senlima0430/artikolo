import React from 'react'
import { useRecoilState } from 'recoil'

import { editorContentState } from '@/store/atoms'
import { Textarea } from '../common/TextArea'

export function MarkdownArea() {
  const [editor, setEditorState] = useRecoilState(editorContentState)

  function handleContentChange(e: React.FormEvent<HTMLTextAreaElement>) {
    setEditorState({
      ...editor,
      content: e.currentTarget.value,
    })
  }

  return <Textarea value={editor.content} onChange={handleContentChange} />
}
