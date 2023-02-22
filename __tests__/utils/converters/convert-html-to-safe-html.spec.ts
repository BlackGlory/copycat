import { convertHTMLToSafeHTML } from '@converters/convert-html-to-safe-html.js'

test('convertHtmlToSafeHTML', () => {
  const result = convertHTMLToSafeHTML(
    '<script>EVIL</script>'
  + '<p>Hello World</p>'
  + '<style>EVIL</style>'
  )

  expect(result).toBe('<p>Hello World</p>')
})
