import { convertUrlToImageHTML } from '@converters/convert-url-to-image-html'

test('convertUrlToImageHTML', () => {
  const result = convertUrlToImageHTML('https://hello.world')

  expect(result).toBe('<img src="https://hello.world" />')
})
