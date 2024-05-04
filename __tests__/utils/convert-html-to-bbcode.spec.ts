import { describe, test, expect } from 'vitest'
import { convertHTMLToBBCode } from '@utils/convert-html-to-bbcode.js'

describe('convertHTMLToBBCode', () => {
  test('a', () => {
    const html = '<a href="/">text</a>'

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[url=/]text[/url]')
  })

  test('img', () => {
    const html = '<img src="image.jpg" />'

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[img]image.jpg[/img]')
  })

  test('font-size', () => {
    const html = `<span style="font-size: 30px">text</span>`

    const result = convertHTMLToBBCode(html)

    expect(result).toBe('[size=30]text[/size]')
  })
})
