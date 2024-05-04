import { describe, test, expect } from 'vitest'
import { formatURL } from '@utils/format-url.js'
import { URLFormat, URLEncoding } from '@src/contract.js'

describe('formatURL', () => {
  describe('format', () => {
    describe('URLFormat.Original', () => {
      test('absolute url', () => {
        const baseURL = 'http://localhost/a'
        const url = 'http://localhost/b'

        const result = formatURL(url, baseURL, {
          format: URLFormat.Original
        , encoding: URLEncoding.Original
        })

        expect(result).toBe('http://localhost/b')
      })

      test('relative url', () => {
        const baseURL = 'http://localhost/a'
        const url = 'b'

        const result = formatURL(url, baseURL, {
          format: URLFormat.Original
        , encoding: URLEncoding.Original
        })

        expect(result).toBe('b')
      })
    })

    test('URLFormat.Absolute', () => {
      const baseURL = 'http://localhost/a'
      const url = 'b'

      const result = formatURL(url, baseURL, {
        format: URLFormat.Absolute
      , encoding: URLEncoding.Original
      })

      expect(result).toBe('http://localhost/b')
    })

    test('URLFormat.Relative', () => {
      const baseURL = 'http://localhost/a'
      const url = 'http://localhost/b'

      const result = formatURL(url, baseURL, {
        format: URLFormat.Relative
      , encoding: URLEncoding.Original
      })

      expect(result).toBe('b')
    })

    describe('URLFormat.RootRelative', () => {
      test('absolute url', () => {
        const baseURL = 'http://localhost/a'
        const url = 'http://localhost/b'

        const result = formatURL(url, baseURL, {
          format: URLFormat.RootRelative
        , encoding: URLEncoding.Original
        })

        expect(result).toBe('/b')
      })

      test('relative url', () => {
        const baseURL = 'http://localhost/a'
        const url = 'b'

        const result = formatURL(url, baseURL, {
          format: URLFormat.RootRelative
        , encoding: URLEncoding.Original
        })

        expect(result).toBe('/b')
      })
    })
  })

  describe('encoding', () => {
    describe('URLEncoding.Original', () => {
      test('non-encoded', () => {
        const baseURL = 'http://localhost'
        const url = 'http://你好世界'

        const result = formatURL(url, baseURL, {
          format: URLFormat.Original
        , encoding: URLEncoding.Original
        })

        expect(result).toBe('http://你好世界')
      })

      test('encoded', () => {
        const baseURL = 'http://localhost'
        const url = encodeURI('http://你好世界')

        const result = formatURL(url, baseURL, {
          format: URLFormat.Original
        , encoding: URLEncoding.Original
        })

        expect(result).toBe(url)
      })
    })

    test('URLEncoding.Encode', () => {
      const baseURL = 'http://localhost'
      const url = 'http://你好世界'

      const result = formatURL(url, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Encode
      })

      expect(result).toBe(encodeURI('http://你好世界'))
    })

    test('URLEncoding.Decode', () => {
      const baseURL = 'http://localhost'
      const url = encodeURI('http://你好世界')

      const result = formatURL(url, baseURL, {
        format: URLFormat.Original
      , encoding: URLEncoding.Decode
      })

      expect(result).toBe('http://你好世界')
    })
  })
})
