import { convertHTMLToCommonmarkMarkdown } from '@converters/convert-html-to-commonmark-markdown.js'

test('convertHtmlToCommonmarkMarkdown', async () => {
  const html = '<em><none>Hello*World</none></em>'

  const result = await convertHTMLToCommonmarkMarkdown(html)

  expect(result).toBe('*Hello\\*World*')
})
