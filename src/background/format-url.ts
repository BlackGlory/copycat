import { URLFormat, URLEncoding } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'
import { encode, decode } from 'url-operator'

export async function formatURL(url: string, baseURL: string): Promise<string> {
  const { urlFormat, urlEncoding } = await getConfig()

  switch (urlFormat) {
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

  switch (urlEncoding) {
    case URLEncoding.AlwaysEncode: {
      url = encode(url)
      break
    }
    case URLEncoding.AlwaysDecode: {
      url = decode(url)
      break
    }
    case URLEncoding.Original: {
      break
    }
  }

  return url
}
