import React from 'react'
import styled from 'styled-components'

import { Title } from './Title'
import { Subtitle } from './Subtitle'
import { MarkdownArea } from './Markdown'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 40px auto;
  grid-template-columns: 1fr;
  gap: 1rem;
`

export function EditorView() {
  return (
    <Container>
      <Title />
      <Subtitle />
      <MarkdownArea />
    </Container>
  )
}
