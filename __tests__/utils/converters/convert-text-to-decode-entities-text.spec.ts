import { convertTextToDecodeEntitiesText } from '@converters/convert-text-to-decode-entities-text'

test('convertTextToDecodeEntitiesText', () => {
  const result = convertTextToDecodeEntitiesText('&lt;&gt;')

  expect(result).toBe('<>')
})
