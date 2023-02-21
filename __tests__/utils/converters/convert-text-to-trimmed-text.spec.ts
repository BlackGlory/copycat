import { convertTextToTrimmedText } from '@converters/convert-text-to-trimmed-text'

test('convertTextToTrimmedText', () => {
  const result = convertTextToTrimmedText(`
    Hello World
  `)

  expect(result).toBe('Hello World')
})
