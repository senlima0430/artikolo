export type TextLineState = {
  id: string
  type: 'h1' | 'p'
  value: string
  isEdit: boolean
  isFocus: boolean
}

export type TypeAreaState = {
  top: number
  show: boolean
}

export type ArticleContextType = {
  content: TextLineState[]
  setContent: (f: (draft: TextLineState[]) => void | TextLineState[]) => void
}

export type TypeAreaContextType = {
  typeArea: TypeAreaState
  setTypeArea: (f: (draft: TypeAreaState) => void | TypeAreaState) => void
}
