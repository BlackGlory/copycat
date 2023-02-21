import { convertHtmlToNoAttrHTML } from '@converters/convert-html-to-no-attr-html.js'

test('convertHtmlToNoAttrHTML', () => {
  const result = convertHtmlToNoAttrHTML('<a href="../hello">Hello World</a>')

  expect(result).toBe('<a>Hello World</a>')
})
