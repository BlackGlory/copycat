import { convertHtmlToBBCode } from '@src/converters/html/bbcode'

test('convertHtmlToBBCode', () => {
  const result = convertHtmlToBBCode('<a href="/"><img src="hello.jpg" /></a>')

  expect(result).toBe('[url=/][img]hello.jpg[/img][/url]')
})
