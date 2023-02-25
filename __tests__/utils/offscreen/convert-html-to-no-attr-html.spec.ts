import { convertHTMLToNoAttrHTML } from '@offscreen/convert-html-to-no-attr-html.js'

test('convertHTMLToNoAttrHTML', () => {
  const result = convertHTMLToNoAttrHTML('<a href="../hello">Hello World</a>')

  expect(result).toBe('<a>Hello World</a>')
})
