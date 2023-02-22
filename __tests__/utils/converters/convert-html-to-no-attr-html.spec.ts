import { convertHTMLToNoAttrHTML } from '@converters/convert-html-to-no-attr-html.js'

test('convertHtmlToNoAttrHTML', () => {
  const result = convertHTMLToNoAttrHTML('<a href="../hello">Hello World</a>')

  expect(result).toBe('<a>Hello World</a>')
})
