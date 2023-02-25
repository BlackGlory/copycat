import { formatURLsInHTML } from '@utils/format-urls-in-html.js'
import { URLFormat, URLEncoding } from '@src/contract.js'
import { dedent } from 'extra-tags'

describe('formatURLsInHTML', () => {
  describe('format', () => {
    test('URLFormat.Original', () => {
      const baseURL = 'http://localhost/a'
      const html = dedent`
        <a href="http://localhost/b">text</a>
        <img src="c">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Original
      })

      expect(result).toBe(dedent`
        <a href="http://localhost/b">text</a>
        <img src="c">
      `)
    })

    test('URLFormat.Absolute', () => {
      const baseURL = 'http://localhost/a'
      const html = dedent`
        <a href="http://localhost/b">text</a>
        <img src="c">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Absolute
      , encoding: URLEncoding.Original
      })

      expect(result).toBe(dedent`
        <a href="http://localhost/b">text</a>
        <img src="http://localhost/c">
      `)
    })

    test('URLFormat.Relative', () => {
      const baseURL = 'http://localhost/a'
      const html = dedent`
        <a href="http://localhost/b">text</a>
        <img src="c">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Relative
      , encoding: URLEncoding.Original
      })

      expect(result).toBe(dedent`
        <a href="b">text</a>
        <img src="c">
      `)
    })

    test('URLFormat.RootRelative', () => {
      const baseURL = 'http://localhost/a'
      const html = dedent`
        <a href="http://localhost/b">text</a>
        <img src="c">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.RootRelative
      , encoding: URLEncoding.Original
      })

      expect(result).toBe(dedent`
        <a href="/b">text</a>
        <img src="/c">
      `)
    })
  })

  describe('encoding', () => {
    test('URLEncoding.Original', () => {
      const baseURL = 'http://localhost'
      const html = dedent`
        <a href="http://${encodeURI('你好世界')}">text</a>
        <img src="http://你好世界">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Original
      })

      expect(result).toBe(html)
    })

    test('URLEncoding.Encode', () => {
      const baseURL = 'http://localhost'
      const html = dedent`
        <a href="http://${encodeURI('你好世界')}">text</a>
        <img src="http://你好世界">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Encode
      })

      expect(result).toBe(dedent`
        <a href="http://${encodeURI('你好世界')}">text</a>
        <img src="http://${encodeURI('你好世界')}">
      `)
    })

    test('URLEncoding.Decode', () => {
      const baseURL = 'http://localhost'
      const html = dedent`
        <a href="http://${encodeURI('你好世界')}">text</a>
        <img src="http://你好世界">
      `

      const result = formatURLsInHTML(html, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Decode
      })

      expect(result).toBe(dedent`
        <a href="http://你好世界">text</a>
        <img src="http://你好世界">
      `)
    })
  })
})
