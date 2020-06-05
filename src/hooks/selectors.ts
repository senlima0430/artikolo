import { selector } from 'recoil'
import { articleState } from './atoms'

export const articleTextLineCountState = selector({
  key: 'articleTextLineCountState',
  get: ({ get }) => {
    const article = get(articleState)

    return article.length
  }
})

export const articleLastTextLineState = selector({
  key: 'articleLastTextLineState',
  get: ({ get }) => {
    const article = get(articleState)

    return article[article.length - 1]
  }
})
