import { convertTextToRawString } from '@converters/convert-text-to-raw-string'

test('convertTextToRawString', () => {
  const result = convertTextToRawString('\nHello World\n')

  expect(result).toBe(String.raw`\nHello World\n`)
})
