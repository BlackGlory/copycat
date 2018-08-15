import { convertMarkdownToBeautifyMarkdown } from '../../src/converters/markdown'

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
