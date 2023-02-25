import { createOrgModeLink } from '@utils/create-org-mode-link.js'

describe('createOrgModeLink', () => {
  test('url', () => {
    const url = 'http://localhost'

    const result = createOrgModeLink(url)

    expect(result).toBe('http://localhost')
  })

  test('url, text', () => {
    const url = 'http://localhost'
    const text = 'text'

    const result = createOrgModeLink(url, text)

    expect(result).toBe('[[http://localhost][text]]')
  })
})
