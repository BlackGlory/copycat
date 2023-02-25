import { createPlainTextLink } from '@utils/create-plain-text-link.js'

describe('createPlainTextLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createPlainTextLink(url)

    expect(result).toBe('http://localhost')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result = createPlainTextLink(url, text)

    expect(result).toBe('text\nhttp://localhost')
  })
})
