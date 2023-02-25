import { cleanHTML } from '@utils/clean-html.js'
import { dedent } from 'extra-tags'

test('cleanHTML', () => {
  const html = dedent`
    <div>
      <img src="../hello" />
      <a href="../hello" target="_blank">Hello World</a>
    </div>
  `

  const result = cleanHTML(
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
