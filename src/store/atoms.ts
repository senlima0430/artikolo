import { atom } from 'recoil'

export const appModeState = atom({
  key: 'appModeState',
  default: 'markdown',
})

/*
  ? title: h1 title, can be <title> children
  ? subtitle: h2 subtitle, can be <meta rel="description"> content
  ? content: article content, wrap by div
*/
export const editorContentState = atom({
  key: 'editorContentState',
  default: {
    title: '',
    subtitle: '',
    content: 'hello world',
  },
})

/**
 * * export content should wrap by <article>
 * * title and subtitle be an <section>
 * * and content should wrap by a <section>
 */
