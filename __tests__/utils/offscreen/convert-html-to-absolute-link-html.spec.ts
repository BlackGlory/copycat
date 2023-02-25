import { convertHTMLToAbsoluteLinkHTML } from '@offscreen/convert-html-to-absolute-link-html.js'
import { dedent  } from 'extra-tags'

test('convertHTMLToAbsoluteLinkHTML', () => {
  const result = convertHTMLToAbsoluteLinkHTML(
    dedent`
      <img src="../hello">
      <a href="../hello">Hello World</a>
    `
  , 'https://hello.world/test/test'
  )

  expect(result).toBe(dedent`
    <img src="https://hello.world/hello">
    <a href="https://hello.world/hello">Hello World</a>
  `)
})
