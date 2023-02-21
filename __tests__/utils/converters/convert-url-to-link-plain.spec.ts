import { convertUrlToLinkPlain } from '@converters/convert-url-to-link-plain'

test('convertUrlToLinkPlain', () => {
  const result1 = convertUrlToLinkPlain('https://hello.world')
  const result2 = convertUrlToLinkPlain('https://hello.world', 'Hello World')

  expect(result1).toBe('https://hello.world')
  expect(result2).toBe('Hello World\nhttps://hello.world')
})
