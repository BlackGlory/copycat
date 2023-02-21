import { convertUrlToRootRelativeURL } from '@converters/convert-url-to-root-relative-url.js'

test('convertUrlToRootRelativeURL', () => {
  const result = convertUrlToRootRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('/test/hello')
})
