import { test, expect } from 'vitest'
import { sanitizeHTML } from '@utils/sanitize-html.js'

test('sanitizeHTML', () => {
  const html = 
    '<script>script</script>'
  + '<p>Hello World</p>'
  + '<style>style</style>'

  const result = sanitizeHTML(html)

  expect(result).toBe('<p>Hello World</p>')
})
