import { convertTextToRawString } from '@converters/convert-text-to-raw-string.js'

test('convertTextToRawString', () => {
  const result = convertTextToRawString('\nHello World\n')

  expect(result).toBe(String.raw`\nHello World\n`)
})
