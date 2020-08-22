import React from 'react'
import { useRecoilValue } from 'recoil'
import Markdown from 'react-markdown'

import { editorContentState } from '@/store/atoms'

export function PreviewView() {
  const editorContent = useRecoilValue(editorContentState)

  const result = `# ${editorContent.title}\n## ${editorContent.subtitle}\n${editorContent.content}`

  return (
    <div>
      <Markdown source={result} />
    </div>
  )
}
