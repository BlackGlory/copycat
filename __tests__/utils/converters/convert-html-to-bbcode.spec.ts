import { convertHTMLToBBCode } from '@converters/convert-html-to-bbcode.js'

describe('convertHTMLToBBCode', () => {
  test('img', () => {
    const html = '<img src="hello.jpg" />'

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[img]hello.jpg[/img]')
  })

  test('a', () => {
    const html = '<a href="/">Text</a>'

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[url=/]Text[/url]')
  })

  test('font-size', () => {
    const html = `<span style="font-size: 30px">Large Text</span>`

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[size=30]Large Text[/size]')
  })
})
