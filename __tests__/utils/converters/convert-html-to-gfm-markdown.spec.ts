import { convertHtmlToGfmMarkdown } from '@converters/convert-html-to-gfm-markdown'

test('convertHtmlToGfmMarkdown', () => {
  const result = convertHtmlToGfmMarkdown('<em><none>Hello*World</none></em>')

  expect(result).toBe('*Hello\\*World*')
})
