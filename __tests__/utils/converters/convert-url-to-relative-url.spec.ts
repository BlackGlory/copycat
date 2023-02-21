import { convertUrlToRelativeURL } from '@converters/convert-url-to-relative-url.js'

test('convertUrlToRelativeURL', () => {
  const result = convertUrlToRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('../hello')
})