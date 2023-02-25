import { cleanHTML } from '@utils/clean-html.js'
import { dedent } from 'extra-tags'

test('cleanHTML', () => {
  const html = dedent`
    <div>
      <img src="../src" />
      <a href="../href" target="_blank">text</a>
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

  expect(result).toBe('<a href="../href">text</a>')
})
