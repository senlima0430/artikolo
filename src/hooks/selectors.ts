import { selector } from 'recoil'
import { articleState } from './atoms'

export const articleTextLineCountState = selector({
  key: 'articleState',
  get: ({ get }) => {
    const article = get(articleState)

    return article.length
  }
})
