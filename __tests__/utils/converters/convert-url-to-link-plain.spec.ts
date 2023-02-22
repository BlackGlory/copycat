import { convertURLToLinkPlain } from '@converters/convert-url-to-link-plain.js'

test('convertUrlToLinkPlain', () => {
  const result1 = convertURLToLinkPlain('https://hello.world')
  const result2 = convertURLToLinkPlain('https://hello.world', 'Hello World')

  expect(result1).toBe('https://hello.world')
  expect(result2).toBe('Hello World\nhttps://hello.world')
})
