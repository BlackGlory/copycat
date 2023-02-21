import { convertHtmlToRelativeLinkHTML } from '@converters/convert-html-to-relative-link-html'

test('convertHtmlToRelativeLinkHTML', () => {
  const result = convertHtmlToRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `)
})
