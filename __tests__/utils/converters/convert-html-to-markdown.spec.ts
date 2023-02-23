import { convertHTMLToMarkdown } from '@converters/convert-html-to-markdown.js'

test('convertHTMLToMarkdown', async () => {
  const html = '<em><none>Hello*World</none></em>'

  const result = await convertHTMLToMarkdown(html)

  expect(result).toBe('*Hello\\*World*')
})
