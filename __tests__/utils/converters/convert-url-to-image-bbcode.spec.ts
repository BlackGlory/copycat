import { convertUrlToImageBBCode } from '@converters/convert-url-to-image-bbcode.js'

test('convertUrlToImageBBCode', () => {
  const result = convertUrlToImageBBCode('https://hello.world')

  expect(result).toBe('[img]https://hello.world[/img]')
})
