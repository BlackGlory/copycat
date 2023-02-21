import { convertHtmlToGhostMarkdown } from '@converters/convert-html-to-ghost-markdown'

test('convertHtmlToGhostMarkdown', () => {
  const result = convertHtmlToGhostMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
