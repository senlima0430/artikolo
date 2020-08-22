import React from 'react'
import { RouteComponentProps } from '@reach/router'

export function NotFound(props: RouteComponentProps) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <span role="img" aria-label="thinking">
          🤔
        </span>
        <p>There are nothing for you</p>
      </div>
    </div>
  )
}
