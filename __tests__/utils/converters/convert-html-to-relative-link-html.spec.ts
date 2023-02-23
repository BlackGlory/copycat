import { convertHTMLToRelativeLinkHTML } from '@converters/convert-html-to-relative-link-html.js'
import { dedent } from 'extra-tags'

test('convertHTMLToRelativeLinkHTML', () => {
  const result = convertHTMLToRelativeLinkHTML(
    dedent`
      <img src="https://hello.world/test/hello">
      <a href="https://hello.world/test/hello">Hello World</a>
    `
  , 'https://hello.world/test/test'
  )

  expect(result).toBe(dedent`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `)
})
