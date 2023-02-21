import { convertHtmlToBeautifyHTML } from '@converters/convert-html-to-beautify-html'

test('convertHtmlToBeautifyHTML', () => {
  const result = convertHtmlToBeautifyHTML(`
  <div>
  <p>Hello World</p>
  </div>
  `)

  expect(result).toBe('<div>\n    <p>Hello World</p>\n</div>')
})
