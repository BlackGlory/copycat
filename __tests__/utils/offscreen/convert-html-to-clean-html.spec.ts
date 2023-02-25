import { convertHTMLToCleanHTML } from '@offscreen/convert-html-to-clean-html.js'
import { dedent } from 'extra-tags'

test('convertHTMLToCleanHTML', () => {
  const html = dedent`
    <div>
      <img src="../hello" />
      <a href="../hello" target="_blank">Hello World</a>
    </div>
  `

  const result = convertHTMLToCleanHTML(
    html
  , {
      allowlist: [
        {
          elements: 'a'
        , attributes: 'href'
        }
      ]
    }
  )

  expect(result).toBe('<a href="../hello">Hello World</a>')
})
