import { atom } from 'recoil'
import { generateId } from '../helper'

const defaultArticle = [
  {
    id: generateId(),
    type: 'h1',
    value: 'Title'
  },
  {
    id: generateId(),
    type: 'p',
    value: 'Tell your story..'
  }
]

export const articleState = atom({
  key: 'articleState',
  default: defaultArticle
})

export const textInputState = atom({
  key: 'textInputState',
  default: defaultArticle[0]
})
