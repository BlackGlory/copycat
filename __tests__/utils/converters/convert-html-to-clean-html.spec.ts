import { convertHTMLToCleanHTML } from '@converters/convert-html-to-clean-html.js'

test('convertHTMLToCleanHTML', () => {
  const result = convertHTMLToCleanHTML(
    '<script>script</script>'
  + '<p>Hello World</p>'
  + '<style>style</style>'
  )

  expect(result).toBe('<p>Hello World</p>')
})
