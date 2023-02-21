import { convertUrlToLinkHTML } from '@converters/convert-url-to-link-html.js'

test('convertUrlToLinkHTML', () => {
  const result1 = convertUrlToLinkHTML('https://hello.world')
  const result2 = convertUrlToLinkHTML('https://hello.world', 'Hello World')

  expect(result1).toBe('<a href="https://hello.world">https://hello.world</a>')
  expect(result2).toBe('<a href="https://hello.world">Hello World</a>')
})
