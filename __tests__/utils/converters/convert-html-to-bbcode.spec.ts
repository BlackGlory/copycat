import { convertHtmlToBBCode } from '@converters/convert-html-to-bbcode'

test('convertHtmlToBBCode', () => {
  const result = convertHtmlToBBCode('<a href="/"><img src="hello.jpg" /></a>')

  expect(result).toBe('[url=/][img]hello.jpg[/img][/url]')
})
