import { convertURLToImageMarkdown } from '@converters/convert-url-to-image-markdown.js'

test('convertUrlToImageMarkdown', () => {
  const result = convertURLToImageMarkdown('https://hello.world')

  expect(result).toBe('![](https://hello.world)')
})
