import { convertHtmlToBBCode } from '../../../src/converters/html/bbcode'

test('convertHtmlToBBCode', () => {
  expect(convertHtmlToBBCode('<a href="/"><img src="hello.jpg" /></a>'))
    .toBe('[url=/][img]hello.jpg[/img][/url]')
})
