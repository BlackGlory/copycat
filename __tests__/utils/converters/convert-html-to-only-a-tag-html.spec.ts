import { convertHTMLToOnlyATagHTML } from '@converters/convert-html-to-only-a-tag-html.js'
import { dedent } from 'extra-tags'

test('convertHtmlToOnlyATagHTML', () => {
  const result = convertHTMLToOnlyATagHTML(dedent`
    <img src="../hello" /><a href="../hello">Hello World</a>
  `)

  expect(result).toBe('<a href="../hello">Hello World</a>')
})
