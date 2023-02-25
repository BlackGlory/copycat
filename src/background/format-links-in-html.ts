import { URLFormat } from '@src/contract.js'
import { offscreen } from './offscreen-client.js'
import { getConfig } from './storage.js'

export async function formatURLsInHTML(
  html: string
, baseUrl: string
): Promise<string> {
  const config = await getConfig()

  switch (config.url.format) {
    case URLFormat.Absolute:
      return await offscreen.convertHTMLToAbsoluteLinkHTML(html, baseUrl)
    case URLFormat.Relative:
      return await offscreen.convertHTMLToRelativeLinkHTML(html, baseUrl)
    case URLFormat.RootRelative:
      return await offscreen.convertHTMLToRootRelativeLinkHTML(html, baseUrl)
    case URLFormat.Original:
      return html
  }
}
