import { convertHtmlToSafeHTML } from '@converters/convert-html-to-safe-html.js'

test('convertHtmlToSafeHTML', () => {
  const result = convertHtmlToSafeHTML(
    '<script>EVIL</script>'
  + '<p>Hello World</p>'
  + '<style>EVIL</style>'
  )

  expect(result).toBe('<p>Hello World</p>')
})
