import { convertHTMLToRootRelativeLinkHTML } from '@converters/convert-html-to-root-relative-link-html.js'
import { dedent } from 'extra-tags'

test('convertHtmlToRootRelativeLinkHTML', () => {
  const result = convertHTMLToRootRelativeLinkHTML(
    dedent`
      <img src="https://hello.world/test/hello">
      <a href="https://hello.world/test/hello">Hello World</a>
    `
  , 'https://hello.world/test/test'
  )

  expect(result).toBe(dedent`
    <img src="/test/hello">
    <a href="/test/hello">Hello World</a>
  `)
})
