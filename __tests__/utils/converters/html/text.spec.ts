import { convertHtmlToPlainText } from '@converters/html/text/plain'

test('convertHtmlToText', () => {
  const result = convertHtmlToPlainText('<p>Hello World</p>')

  expect(result).toBe('Hello World')
})
