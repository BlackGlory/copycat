import { convertHtmlToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown.js'

test('convertHtmlToCommonmarkMarkdown', () => {
  const result = convertHtmlToCommonmarkMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
