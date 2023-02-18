import { convertUrlToAbsoluteURL } from '@converters/url/formatted/absolute'
import { convertUrlToRelativeURL } from '@converters/url/formatted/relative'
import { convertUrlToRootRelativeURL } from '@converters/url/formatted/root-relative'

test('convertUrlToAbsoluteURL', () => {
  const result = convertUrlToAbsoluteURL(
    '../hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('https://hello.world/hello')
})

test('convertUrlToRelativeURL', () => {
  const result = convertUrlToRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('../hello')
})

test('convertUrlToRootRelativeURL', () => {
  const result = convertUrlToRootRelativeURL(
    'https://hello.world/test/hello'
  , 'https://hello.world/test/test'
  )

  expect(result).toBe('/test/hello')
})
