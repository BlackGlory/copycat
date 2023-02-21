import { convertHtmlToRootRelativeLinkHTML } from '@converters/convert-html-to-root-relative-link-html'

test('convertHtmlToRootRelativeLinkHTML', () => {
  const result = convertHtmlToRootRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="/test/hello">
    <a href="/test/hello">Hello World</a>
  `)
})
