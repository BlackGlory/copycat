import { describe, test, expect } from 'vitest'
import { createHTMLLink } from '@utils/create-html-link.js'

describe('createHTMLLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createHTMLLink(url)

    expect(result).toBe('<a href="http://localhost">http://localhost</a>')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result = createHTMLLink(url, text)

    expect(result).toBe('<a href="http://localhost">text</a>')
  })
})
