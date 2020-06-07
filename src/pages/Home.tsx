import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Article } from '../components/Article'

export function Home(props: RouteComponentProps): JSX.Element {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Article />
    </div>
  )
}
