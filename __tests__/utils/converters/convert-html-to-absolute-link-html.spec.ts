import { TextEncoder, TextDecoder } from 'util'

// 在JSDOM的测试环境下缺少TextEncoder
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder

import { convertHtmlToAbsoluteLinkHTML } from '@converters/convert-html-to-absolute-link-html.js'
import { dedent  } from 'extra-tags'

test('convertHtmlToAbsoluteLinkHTML', () => {
  const result = convertHtmlToAbsoluteLinkHTML(
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
