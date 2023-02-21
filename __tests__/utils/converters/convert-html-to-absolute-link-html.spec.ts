import { convertHtmlToAbsoluteLinkHTML } from '@converters/convert-html-to-absolute-link-html'

test('convertHtmlToAbsoluteLinkHTML', () => {
  const result = convertHtmlToAbsoluteLinkHTML(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="https://hello.world/hello">
    <a href="https://hello.world/hello">Hello World</a>
  `)
})
