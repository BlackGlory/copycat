import { URLFormat } from '@src/contract'
import { getConfig } from './storage'
import { offscreenClient } from './offscreen-client'

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
