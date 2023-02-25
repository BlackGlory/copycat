import { createBBCodeLink } from '@utils/create-bbcode-link.js'

describe('createBBCodeLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createBBCodeLink(url)

    expect(result).toBe('[url=http://localhost]http://localhost[/url]')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result2 = createBBCodeLink(url, text)

    expect(result2).toBe('[url=http://localhost]text[/url]')
  })
})
