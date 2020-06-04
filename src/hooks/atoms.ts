import { atom } from 'recoil'

export const articleState = atom({
  key: 'articleState',
  default: [
    {
      id: 'article-line-1',
      type: 'h1',
      value: 'Title',
      isEdit: false
    }
  ]
})
