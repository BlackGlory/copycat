import { convertHtmlToPlainText } from '../../../src/converters/html/text'

test('convertHtmlToText', () => {
  expect(convertHtmlToPlainText('<p>Hello World</p>'))
    .toBe('Hello World')
})
