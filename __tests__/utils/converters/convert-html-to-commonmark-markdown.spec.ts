import { convertHTMLToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown.js'

test('convertHtmlToCommonmarkMarkdown', () => {
  const result = convertHTMLToCommonmarkMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
