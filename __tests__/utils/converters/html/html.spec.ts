import { convertHtmlToBeautifyHTML } from '@converters/html/html/beautify'
import { convertHtmlToAbsoluteLinkHTML } from '@converters/html/html/formatted-link/absolute'
import { convertHtmlToRelativeLinkHTML } from '@converters/html/html/formatted-link/relative'
import convertHtmlToRootRelativeLinkHTML from '@converters/html/html/formatted-link/root-relative'
import { convertHtmlToNoAttrHTML } from '@converters/html/html/no-attr'
import { convertHtmlToOnlyATagHTML } from '@converters/html/html/only-a-tag'
import { convertHtmlToSafeHTML } from '@converters/html/html/safe'

test('convertHtmlToAbsoluteLinkHTML', () => {
  const result = convertHtmlToAbsoluteLinkHTML(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="https://hello.world/hello">
    <a href="https://hello.world/hello">Hello World</a>
  `)
})

test('convertHtmlToRelativeLinkHTML', () => {
  const result = convertHtmlToRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `)
})

test('convertHtmlToRootRelativeLinkHTML', () => {
  const result = convertHtmlToRootRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')

  expect(result).toBe(`
    <img src="/test/hello">
    <a href="/test/hello">Hello World</a>
  `)
})

test('convertHtmlToBeautifyHTML', () => {
  const result = convertHtmlToBeautifyHTML(`
  <div>
  <p>Hello World</p>
  </div>
  `)

  expect(result).toBe('<div>\n    <p>Hello World</p>\n</div>')
})

test('convertHtmlToNoAttrHTML', () => {
  const result = convertHtmlToNoAttrHTML('<a href="../hello">Hello World</a>')

  expect(result).toBe('<a>Hello World</a>')
})

test('convertHtmlToOnlyATagHTML', () => {
  const result = convertHtmlToOnlyATagHTML(
    '<img src="../hello" /><a href="../hello">Hello World</a>'
  )

  expect(result).toBe('<a href="../hello">Hello World</a>')
})

test('convertHtmlToSafeHTML', () => {
  const result = convertHtmlToSafeHTML(
    '<script>EVIL</script><p>Hello World</p><style>EVIL</style>'
  )

  expect(result).toBe('<p>Hello World</p>')
})
