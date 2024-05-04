import { describe, test, expect } from 'vitest'
import { convertURLToAbsoluteURL } from '@utils/convert-url-to-absolute-url.js'

describe('convertURLToAbsoluteURL', () => {
  test('relative url', () => {
    const baseURL = 'http://localhost/a/b'
    const relativeURL = './c'

    const result = convertURLToAbsoluteURL(relativeURL, baseURL)

    expect(result).toBe('http://localhost/a/c')
  })

  describe('absolute url', () => {
    test('same origin', () => {
      const baseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost/a/c?query'

      const result = convertURLToAbsoluteURL(absoluteURL, baseURL)

      expect(result).toBe('http://localhost/a/c?query')
    })

    test('diff origin', () => {
      const baseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost:8080/a/c?query'

      const result = convertURLToAbsoluteURL(absoluteURL, baseURL)

      expect(result).toBe('http://localhost:8080/a/c?query')
    })
  })
})
