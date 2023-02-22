import { convertHTMLToBBCode } from '@converters/convert-html-to-bbcode.js'

test('convertHtmlToBBCode', () => {
  const result = convertHTMLToBBCode('<a href="/"><img src="hello.jpg" /></a>')

  expect(result).toBe('[url=/][img]hello.jpg[/img][/url]')
})
