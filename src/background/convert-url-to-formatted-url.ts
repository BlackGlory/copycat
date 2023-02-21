import { URLFormat, URLEncoding } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'
import { encode, decode } from 'url-operator'

export async function convertUrlToFormattedURL(
  url: string
, baseUrl: string
): Promise<string> {
  const { urlFormat, urlEncoding } = await getConfig()

  switch (urlFormat) {
    case URLFormat.Absolute: {
      url = await offscreenClient.convertUrlToAbsoluteURL(url, baseUrl)
      break
    }
    case URLFormat.Relative: {
      url = await offscreenClient.convertUrlToRelativeURL(url, baseUrl)
      break
    }
    case URLFormat.RootRelative: {
      url = await offscreenClient.convertUrlToRootRelativeURL(url, baseUrl)
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
