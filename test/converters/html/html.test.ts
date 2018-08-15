import {
  convertHtmlToAbsoluteLinkHTML
, convertHtmlToRelativeLinkHTML
, convertHtmlToRootRelativeLinkHTML
, convertHtmlToBeautifyHTML
, convertHtmlToNoAttrHTML
, convertHtmlToOnlyATagHTML
, convertHtmlToSafeHTML
} from '../../../src/converters/html/html'

test('convertHtmlToAbsoluteLinkHTML', () => {
  expect(convertHtmlToAbsoluteLinkHTML(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `, 'https://hello.world/test/test')
  ).toBe(`
    <img src="https://hello.world/hello">
    <a href="https://hello.world/hello">Hello World</a>
  `)
})

test('convertHtmlToRelativeLinkHTML', () => {
  expect(convertHtmlToRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')
  ).toBe(`
    <img src="../hello">
    <a href="../hello">Hello World</a>
  `)
})

test('convertHtmlToRootRelativeLinkHTML', () => {
  expect(convertHtmlToRootRelativeLinkHTML(`
    <img src="https://hello.world/test/hello">
    <a href="https://hello.world/test/hello">Hello World</a>
  `, 'https://hello.world/test/test')
  ).toBe(`
    <img src="/test/hello">
    <a href="/test/hello">Hello World</a>
  `)
})

test('convertHtmlToBeautifyHTML', () => {
  expect(convertHtmlToBeautifyHTML(`
  <div>
  <p>Hello World</p>
  </div>
  `)
  ).toBe('<div>\n    <p>Hello World</p>\n</div>')
})

test('convertHtmlToNoAttrHTML', () => {
  expect(convertHtmlToNoAttrHTML('<a href="../hello">Hello World</a>'))
    .toBe('<a>Hello World</a>')
})

test('convertHtmlToOnlyATagHTML', () => {
  expect(convertHtmlToOnlyATagHTML('<img src="../hello" /><a href="../hello">Hello World</a>'))
    .toBe('<a href="../hello">Hello World</a>')
})

test('convertHtmlToSafeHTML', () => {
  expect(convertHtmlToSafeHTML('<script>EVIL</script><p>Hello World</p><style>EVIL</style>'))
    .toBe('<p>Hello World</p>')
})
