import { convertURLToImageHTML } from '@converters/convert-url-to-image-html.js'

test('convertUrlToImageHTML', () => {
  const result = convertURLToImageHTML('https://hello.world')

  expect(result).toBe('<img src="https://hello.world" />')
})
