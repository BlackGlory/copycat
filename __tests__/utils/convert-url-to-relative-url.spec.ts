import { describe, test, expect } from 'vitest'
import { convertURLToRelativeURL } from '@utils/convert-url-to-relative-url.js'

describe('convertURLToRelativeURL', () => {
  test('relative url', () => {
    const absoluteBaseURL = 'http://localhost/a/b'
    const relativeURL = 'c?query'

    const result = convertURLToRelativeURL(relativeURL, absoluteBaseURL)

    expect(result).toBe('c?query')
  })

  describe('absolute url', () => {
    test('same origin', () => {
      const absoluteBaseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost/a/c?query'

      const result = convertURLToRelativeURL(absoluteURL, absoluteBaseURL)

      expect(result).toBe('c?query')
    })

    test('diff origin', () => {
      const absoluteBaseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost:8080/a/c?query'

      const result = convertURLToRelativeURL(absoluteURL, absoluteBaseURL)

      expect(result).toBe('http://localhost:8080/a/c?query')
    })
  })
})
