import { URLFormat, URLEncoding } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'
import { encode, decode } from 'url-operator'

export async function formatURL(url: string, baseURL: string): Promise<string> {
  const config = await getConfig()

  switch (config.url.format) {
    case URLFormat.Absolute: {
      url = await offscreenClient.convertURLToAbsoluteURL(url, baseURL)
      break
    }
    case URLFormat.Relative: {
      url = await offscreenClient.convertURLToRelativeURL(url, baseURL)
      break
    }
    case URLFormat.RootRelative: {
      url = await offscreenClient.convertURLToRootRelativeURL(url, baseURL)
      break
    }
    case URLFormat.Original: {
      break
    }
  }

  switch (config.url.encoding) {
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
