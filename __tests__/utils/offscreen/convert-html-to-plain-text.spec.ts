import { convertHTMLToPlainText } from '@offscreen/convert-html-to-plain-text.js'

test('convertHTMLToPlainText', () => {
  const result = convertHTMLToPlainText('<p>Hello World</p>')

  expect(result).toBe('Hello World')
})
