import { convertUrlToLinkBBCode } from '@converters/convert-url-to-link-bbcode.js'

test('convertUrlToLinkBBCode', () => {
  const result1 = convertUrlToLinkBBCode('https://hello.world')
  const result2 = convertUrlToLinkBBCode('https://hello.world', 'Hello World')

  expect(result1).toBe('[url=https://hello.world]https://hello.world[/url]')
  expect(result2).toBe('[url=https://hello.world]Hello World[/url]')
})
