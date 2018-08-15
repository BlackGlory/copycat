import {
  convertUrlToAbsoluteURL
, convertUrlToRelativeURL
, convertUrlToRootRelativeURL
} from '../../../src/converters/url/formatted'

test('convertUrlToAbsoluteURL', () => {
  expect(convertUrlToAbsoluteURL('../hello', 'https://hello.world/test/test'))
    .toBe('https://hello.world/hello')
})

test('convertUrlToRelativeURL', () => {
  expect(convertUrlToRelativeURL('https://hello.world/test/hello', 'https://hello.world/test/test'))
    .toBe('../hello')
})

test('convertUrlToRootRelativeURL', () => {
  expect(convertUrlToRootRelativeURL('https://hello.world/test/hello', 'https://hello.world/test/test'))
    .toBe('/test/hello')
})
