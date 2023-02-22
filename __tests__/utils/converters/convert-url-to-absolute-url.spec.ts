import { convertURLToAbsoluteURL } from '@converters/convert-url-to-absolute-url.js'

test('convertUrlToAbsoluteURL', () => {
  const result = convertURLToAbsoluteURL(
    '../hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('https://hello.world/hello')
})
