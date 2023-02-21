import { URLFormat } from '@src/contract.js'
import { getConfig } from './storage.js'
import { offscreenClient } from './offscreen-client.js'

export async function convertUrlToFormattedURL(
  url: string
, baseUrl: string
): Promise<string> {
  const { urlFormat } = await getConfig()

  switch (urlFormat) {
    case URLFormat.Absolute:
      return await offscreenClient.convertUrlToAbsoluteURL(url, baseUrl)
    case URLFormat.Relative:
      return await offscreenClient.convertUrlToRelativeURL(url, baseUrl)
    case URLFormat.RootRelative:
      return await offscreenClient.convertUrlToRootRelativeURL(url, baseUrl)
    case URLFormat.Original:
      return url
  }
}
