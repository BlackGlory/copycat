import {
  convertUrlToLinkBBCode
, convertUrlToLinkHTML
, convertUrlToLinkMarkdown
, convertUrlToLinkPlain
} from '../../../src/converters/url/link'

test('convertUrlToLinkBBCode', () => {
  expect(convertUrlToLinkBBCode('https://hello.world'))
    .toBe('[url=https://hello.world]https://hello.world[/url]')
  expect(convertUrlToLinkBBCode('https://hello.world', 'Hello World'))
    .toBe('[url=https://hello.world]Hello World[/url]')
})

test('convertUrlToLinkHTML', () => {
  expect(convertUrlToLinkHTML('https://hello.world'))
    .toBe('<a href="https://hello.world">https://hello.world</a>')
  expect(convertUrlToLinkHTML('https://hello.world', 'Hello World'))
    .toBe('<a href="https://hello.world">Hello World</a>')
})

test('convertUrlToLinkMarkdown', () => {
  expect(convertUrlToLinkMarkdown('https://hello.world'))
    .toBe('[https://hello.world](https://hello.world)')
  expect(convertUrlToLinkMarkdown('https://hello.world', 'Hello World'))
    .toBe('[Hello World](https://hello.world)')
})

test('convertUrlToLinkPlain', () => {
  expect(convertUrlToLinkPlain('https://hello.world'))
    .toBe('https://hello.world')
  expect(convertUrlToLinkPlain('https://hello.world', 'Hello World'))
    .toBe('Hello World\nhttps://hello.world')
})
