import { URLFormat } from '@src/contract'
import { offscreenClient } from './offscreen-client'
import { getConfig } from './storage'

export async function convertHtmlToFormattedLinkHTML(
  html: string
, baseUrl: string
): Promise<string> {
  const { urlFormat } = await getConfig()

  switch (urlFormat) {
    case URLFormat.Absolute:
      return await offscreenClient.convertHtmlToAbsoluteLinkHTML(html, baseUrl)
    case URLFormat.Relative:
      return await offscreenClient.convertHtmlToRelativeLinkHTML(html, baseUrl)
    case URLFormat.RootRelative:
      return await offscreenClient.convertHtmlToRootRelativeLinkHTML(html, baseUrl)
    case URLFormat.Original:
      return html
  }
}
