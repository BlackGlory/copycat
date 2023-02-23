import { URLFormat } from '@src/contract.js'
import { offscreenClient } from './offscreen-client.js'
import { getConfig } from './storage.js'

export async function formatURLsInHTML(
  html: string
, baseUrl: string
): Promise<string> {
  const config = await getConfig()

  switch (config.url.format) {
    case URLFormat.Absolute:
      return await offscreenClient.convertHTMLToAbsoluteLinkHTML(html, baseUrl)
    case URLFormat.Relative:
      return await offscreenClient.convertHTMLToRelativeLinkHTML(html, baseUrl)
    case URLFormat.RootRelative:
      return await offscreenClient.convertHTMLToRootRelativeLinkHTML(html, baseUrl)
    case URLFormat.Original:
      return html
  }
}
