import { atom } from 'recoil'
import { generateId } from '../helper'

export const articleState = atom({
  key: 'articleState',
  default: [
    {
      id: generateId(),
      type: 'h1',
      value: 'Title',
      isEdit: true
    }
  ]
})
