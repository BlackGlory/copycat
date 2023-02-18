import { convertTextToDecodeEntitiesText } from '@converters/text/decode-entities'
import { convertTextToRawString } from '@converters/text/raw-string'
import { convertTextToTrimmedText } from '@converters/text/trim'

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
