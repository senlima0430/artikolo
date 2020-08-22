import React from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'

import { EditorView } from '@/modules/editor/View'
import { PreviewView } from '@/modules/preview/View'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 90vw;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`

const Block = styled.div`
  flex: 1;
  min-width: 320px;
  padding-top: 5vh;
  height: 95vh;
`

export function Home(props: RouteComponentProps) {
  return (
    <Wrapper>
      <Block>
        <EditorView />
      </Block>
      <Block>
        <PreviewView />
      </Block>
    </Wrapper>
  )
}
