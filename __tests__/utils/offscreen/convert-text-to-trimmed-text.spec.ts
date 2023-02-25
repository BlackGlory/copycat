import { convertTextToTrimmedText } from '@offscreen/convert-text-to-trimmed-text.js'

test('convertTextToTrimmedText', () => {
  const result = convertTextToTrimmedText(`
    Hello World
  `)

  expect(result).toBe('Hello World')
})
