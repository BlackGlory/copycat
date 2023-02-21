import { convertUrlToAbsoluteURL } from '@converters/convert-url-to-absolute-url'

test('convertUrlToAbsoluteURL', () => {
  const result = convertUrlToAbsoluteURL(
    '../hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('https://hello.world/hello')
})
