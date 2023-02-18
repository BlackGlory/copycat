import { convertUrlToLinkBBCode } from '@converters/url/link/bbcode'
import { convertUrlToLinkHTML } from '@converters/url/link/html'
import { convertUrlToLinkMarkdown } from '@converters/url/link/markdown'
import { convertUrlToLinkPlain } from '@converters/url/link/plain'

test('convertUrlToLinkBBCode', () => {
  const result1 = convertUrlToLinkBBCode('https://hello.world')
  const result2 = convertUrlToLinkBBCode('https://hello.world', 'Hello World')

  expect(result1).toBe('[url=https://hello.world]https://hello.world[/url]')
  expect(result2).toBe('[url=https://hello.world]Hello World[/url]')
})

test('convertUrlToLinkHTML', () => {
  const result1 = convertUrlToLinkHTML('https://hello.world')
  const result2 = convertUrlToLinkHTML('https://hello.world', 'Hello World')

  expect(result1).toBe('<a href="https://hello.world">https://hello.world</a>')
  expect(result2).toBe('<a href="https://hello.world">Hello World</a>')
})

test('convertUrlToLinkMarkdown', () => {
  const result1 = convertUrlToLinkMarkdown('https://hello.world')
  const result2 = convertUrlToLinkMarkdown('https://hello.world', 'Hello World')

  expect(result1).toBe('[https://hello.world](https://hello.world)')
  expect(result2).toBe('[Hello World](https://hello.world)')
})

test('convertUrlToLinkPlain', () => {
  const result1 = convertUrlToLinkPlain('https://hello.world')
  const result2 = convertUrlToLinkPlain('https://hello.world', 'Hello World')

  expect(result1).toBe('https://hello.world')
  expect(result2).toBe('Hello World\nhttps://hello.world')
})
