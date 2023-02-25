import { convertURLToRootRelativeURL } from '@offscreen/convert-url-to-root-relative-url.js'

test('convertUrlToRootRelativeURL', () => {
  const result = convertURLToRootRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('/test/hello')
})
