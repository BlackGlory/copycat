import { describe, test, expect } from 'vitest'
import { createMarkdownLink } from '@utils/create-markdown-link.js'

describe('createMarkdownLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createMarkdownLink(url)

    expect(result).toBe('<http://localhost>')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result = createMarkdownLink(url, text)

    expect(result).toBe('[text](http://localhost)')
  })
})
