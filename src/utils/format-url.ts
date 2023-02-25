import { URLFormat, URLEncoding } from '@src/contract.js'
import { encode, decode } from 'url-operator'
import { convertURLToAbsoluteURL } from '@utils/convert-url-to-absolute-url.js'
import { convertURLToRelativeURL } from '@utils/convert-url-to-relative-url.js'
import { convertURLToRootRelativeURL } from '@utils/convert-url-to-root-relative-url.js'
import { IURLConfig } from '@src/contract.js'

export function formatURL(url: string, baseURL: string, config: IURLConfig): string {
  switch (config.format) {
    case URLFormat.Absolute: {
      url = convertURLToAbsoluteURL(url, baseURL)
      break
    }
    case URLFormat.Relative: {
      url = convertURLToRelativeURL(url, baseURL)
      break
    }
    case URLFormat.RootRelative: {
      url = convertURLToRootRelativeURL(url, baseURL)
      break
    }
    case URLFormat.Original: {
      break
    }
  }

  switch (config.encoding) {
    case URLEncoding.Encode: {
      url = encode(url)
      break
    }
    case URLEncoding.Decode: {
      url = decode(url)
      break
    }
    case URLEncoding.Original: {
      break
    }
  }

  return url
}
