import { loadConfigure, URLFormat } from '@src/config'
import { convertHtmlToAbsoluteLinkHTML } from './absolute'
import { convertHtmlToRelativeLinkHTML } from './relative'
import { convertHtmlToRootRelativeLinkHTML } from './root-relative'

export function convertHtmlToFormattedLinkHTML(
  html: string
, baseUrl: string
): string {
  const { urlFormat } = loadConfigure()
  switch (urlFormat) {
    case URLFormat.Absolute:
      return convertHtmlToAbsoluteLinkHTML(html, baseUrl)
    case URLFormat.Relative:
      return convertHtmlToRelativeLinkHTML(html, baseUrl)
    case URLFormat.RootRelative:
      return convertHtmlToRootRelativeLinkHTML(html, baseUrl)
    case URLFormat.Original:
      return html
  }
}
