import { describe, test, expect } from 'vitest'
import { createAsciiDocLink } from '@utils/create-ascii-doc-link.js'

describe('createAsciiDocLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createAsciiDocLink(url)

    expect(result).toBe('http://localhost')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result = createAsciiDocLink(url, text)

    expect(result).toBe('http://localhost[text]')
  })
})
