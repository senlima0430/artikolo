import React from 'react'
import { useImmer } from 'use-immer'
import createCtx from '../hooks/createCtx'
import { TypeAreaState, TypeAreaContextType } from './types'

export const [useTypeArea, CtxProvider] = createCtx<TypeAreaContextType>()

export function TypeAreaProvider({
  children
}: React.HTMLProps<HTMLDivElement>): JSX.Element {
  const [typeArea, setTypeArea] = useImmer<TypeAreaState>({
    top: 0,
    show: false
  })

  return <CtxProvider value={{ typeArea, setTypeArea }}>{children}</CtxProvider>
}
