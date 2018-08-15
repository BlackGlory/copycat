import { loadConfigure } from '../../../../configure'
import { convertHtmlToAbsoluteLinkHTML } from './absolute'
import { convertHtmlToRelativeLinkHTML } from './relative'
import { convertHtmlToRootRelativeLinkHTML } from './root-relative'

export function convertHtmlToFormattedLinkHTML(html: string, baseUrl: string): string {
  const { urlFormat } = loadConfigure()
  switch (urlFormat) {
    case 'absolute':
      return convertHtmlToAbsoluteLinkHTML(html, baseUrl)
    case 'relative':
      return convertHtmlToRelativeLinkHTML(html, baseUrl)
    case 'root-relative':
      return convertHtmlToRootRelativeLinkHTML(html, baseUrl)
    case 'original':
      return html
  }
}

export * from './absolute'
export * from './relative'
export * from './root-relative'
