import { convertHtmlToPlainText } from '@converters/convert-html-to-plain-text.js'

test('convertHtmlToPlainText', () => {
  const result = convertHtmlToPlainText('<p>Hello World</p>')

  expect(result).toBe('Hello World')
})
