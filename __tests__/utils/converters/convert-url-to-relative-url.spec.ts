import { convertURLToRelativeURL } from '@converters/convert-url-to-relative-url.js'

test('convertUrlToRelativeURL', () => {
  const result = convertURLToRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('../hello')
})
