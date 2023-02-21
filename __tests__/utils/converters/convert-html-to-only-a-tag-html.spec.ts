import { convertHtmlToOnlyATagHTML } from '@converters/convert-html-to-only-a-tag-html'

test('convertHtmlToOnlyATagHTML', () => {
  const result = convertHtmlToOnlyATagHTML(
    '<img src="../hello" /><a href="../hello">Hello World</a>'
  )

  expect(result).toBe('<a href="../hello">Hello World</a>')
})
