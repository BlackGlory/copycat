import { convertHtmlToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown'

test('convertHtmlToCommonmarkMarkdown', () => {
  const result = convertHtmlToCommonmarkMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
