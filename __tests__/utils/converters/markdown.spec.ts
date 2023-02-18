import { convertMarkdownToBeautifyMarkdown } from '@converters/markdown/beautify'

test('convertTextToBeautifyText', () => {
  expect(convertMarkdownToBeautifyMarkdown(
`



  Hello World



`
  )).toBe(
`
  Hello World
`
  )
})
