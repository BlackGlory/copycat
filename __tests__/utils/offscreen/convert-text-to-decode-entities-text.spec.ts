import { convertTextToDecodeEntitiesText } from '@offscreen/convert-text-to-decode-entities-text.js'

test('convertTextToDecodeEntitiesText', () => {
  const result = convertTextToDecodeEntitiesText('&lt;&gt;')

  expect(result).toBe('<>')
})
