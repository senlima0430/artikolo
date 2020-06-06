import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Article from '../components/Article'

function Home(props: RouteComponentProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Article />
    </div>
  )
}

export default Home
