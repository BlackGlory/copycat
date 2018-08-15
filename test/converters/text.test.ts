import {
  convertTextToRawString
, convertTextToTrimmedText
, convertTextToDecodeEntitiesText
} from '../../src/converters/text'

test('convertTextToRawString', () => {
  expect(convertTextToRawString('\nHello World\n'))
    .toBe(String.raw`\nHello World\n`)
})

test('convertTextToTrimmedText', () => {
  expect(convertTextToTrimmedText(`
    Hello World
  `)).toBe('Hello World')
})

test('convertTextToDecodeEntitiesText', () => {
  expect(convertTextToDecodeEntitiesText('&lt;&gt;'))
    .toBe('<>')
})
