import {
  convertUrlToImageBBCode
, convertUrlToImageHTML
, convertUrlToImageMarkdown
} from '../../../src/converters/url/image'

test('convertUrlToImageBBCode', () => {
  expect(convertUrlToImageBBCode('https://hello.world'))
    .toBe('[img]https://hello.world[/img]')
})

test('convertUrlToImageHTML', () => {
  expect(convertUrlToImageHTML('https://hello.world'))
    .toBe('<img src="https://hello.world" />')
})

test('convertUrlToImageMarkdown', () => {
  expect(convertUrlToImageMarkdown('https://hello.world'))
    .toBe('![](https://hello.world)')
})
