import { convertURLToRootRelativeURL } from '@utils/convert-url-to-root-relative-url.js'

describe('convertURLToRootRelativeURL', () => {
  test('relative url', () => {
    const absoluteBaseURL = 'http://localhost/a/b'
    const relativeURL = 'c?query'

    const result = convertURLToRootRelativeURL(relativeURL, absoluteBaseURL)

    expect(result).toBe('/a/c?query')
  })

  describe('absolute url', () => {
    test('same origin', () => {
      const absoluteBaseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost/a/c?query'

      const result = convertURLToRootRelativeURL(absoluteURL, absoluteBaseURL)

      expect(result).toBe('/a/c?query')
    })

    test('diff origin', () => {
      const absoluteBaseURL = 'http://localhost/a/b'
      const absoluteURL = 'http://localhost:8080/a/c?query'

      const result = convertURLToRootRelativeURL(absoluteURL, absoluteBaseURL)

      expect(result).toBe('http://localhost:8080/a/c?query')
    })
  })
})
