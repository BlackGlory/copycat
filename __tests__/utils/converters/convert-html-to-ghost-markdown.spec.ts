import { convertHtmlToGhostMarkdown } from '@converters/convert-html-to-ghost-markdown.js'

test('convertHtmlToGhostMarkdown', () => {
  const result = convertHtmlToGhostMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
