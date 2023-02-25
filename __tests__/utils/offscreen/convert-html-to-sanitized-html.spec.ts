import { convertHTMLToSanitizedHTML } from '@offscreen/convert-html-to-sanitized-html.js'

test('convertHTMLToSanitizedHTML', () => {
  const result = convertHTMLToSanitizedHTML(
    '<script>script</script>'
  + '<p>Hello World</p>'
  + '<style>style</style>'
  )

  expect(result).toBe('<p>Hello World</p>')
})
