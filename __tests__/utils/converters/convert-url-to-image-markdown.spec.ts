import { convertUrlToImageMarkdown } from '@converters/convert-url-to-image-markdown'

test('convertUrlToImageMarkdown', () => {
  const result = convertUrlToImageMarkdown('https://hello.world')

  expect(result).toBe('![](https://hello.world)')
})
