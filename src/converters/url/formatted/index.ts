import { loadConfigure, URLFormat } from '@src/configure'
import { convertUrlToAbsoluteURL } from './absolute'
import { convertUrlToRelativeURL } from './relative'
import { convertUrlToRootRelativeURL } from './root-relative'

export function convertUrlToFormattedURL(url: string, baseUrl: string): string {
  const { urlFormat } = loadConfigure()
  switch (urlFormat) {
    case URLFormat.Absolute:
      return convertUrlToAbsoluteURL(url, baseUrl)
    case URLFormat.Relative:
      return convertUrlToRelativeURL(url, baseUrl)
    case URLFormat.RootRelative:
      return convertUrlToRootRelativeURL(url, baseUrl)
    case URLFormat.Original:
      return url
  }
}
