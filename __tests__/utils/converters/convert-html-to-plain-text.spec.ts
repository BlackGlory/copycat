import { convertHTMLToPlainText } from '@converters/convert-html-to-plain-text.js'

test('convertHTMLToPlainText', () => {
  const result = convertHTMLToPlainText('<p>Hello World</p>')

  expect(result).toBe('Hello World')
})
