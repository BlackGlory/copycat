import { convertHtmlToPlainText } from '@converters/convert-html-to-plain-text'

test('convertHtmlToPlainText', () => {
  const result = convertHtmlToPlainText('<p>Hello World</p>')

  expect(result).toBe('Hello World')
})
