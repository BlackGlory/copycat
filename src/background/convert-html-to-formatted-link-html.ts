import { URLFormat } from '@src/contract.js'
import { offscreenClient } from './offscreen-client.js'
import { getConfig } from './storage.js'

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
