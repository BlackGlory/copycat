import { convertHTMLToGfmMarkdown } from '@converters/convert-html-to-gfm-markdown.js'

test('convertHtmlToGfmMarkdown', async () => {
  const html = '<em><none>Hello*World</none></em>'

  const result = await convertHTMLToGfmMarkdown(html)

  expect(result).toBe('*Hello\\*World*')
})
