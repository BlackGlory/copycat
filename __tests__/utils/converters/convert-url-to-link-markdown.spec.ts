import { convertUrlToLinkMarkdown } from '@converters/convert-url-to-link-markdown.js'

test('convertUrlToLinkMarkdown', () => {
  const result1 = convertUrlToLinkMarkdown('https://hello.world')
  const result2 = convertUrlToLinkMarkdown('https://hello.world', 'Hello World')

  expect(result1).toBe('[https://hello.world](https://hello.world)')
  expect(result2).toBe('[Hello World](https://hello.world)')
})
