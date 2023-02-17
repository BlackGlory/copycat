import { convertUrlToImageBBCode } from '@converters/url/image/bbcode'
import { convertUrlToImageHTML } from '@converters/url/image/html'
import { convertUrlToImageMarkdown } from '@converters/url/image/markdown'

test('convertUrlToImageBBCode', () => {
  const result = convertUrlToImageBBCode('https://hello.world')

  expect(result).toBe('[img]https://hello.world[/img]')
})

test('convertUrlToImageHTML', () => {
  const result = convertUrlToImageHTML('https://hello.world')

  expect(result).toBe('<img src="https://hello.world" />')
})

test('convertUrlToImageMarkdown', () => {
  const result = convertUrlToImageMarkdown('https://hello.world')

  expect(result).toBe('![](https://hello.world)')
})
