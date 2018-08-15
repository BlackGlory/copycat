import { loadConfigure } from '../../../configure'
import { convertUrlToAbsoluteURL } from './absolute'
import { convertUrlToRelativeURL } from './relative'
import { convertUrlToRootRelativeURL } from './root-relative'

export function convertUrlToFormattedURL(url: string, baseUrl: string): string {
  const { urlFormat } = loadConfigure()
  switch (urlFormat) {
    case 'absolute':
      return convertUrlToAbsoluteURL(url, baseUrl)
    case 'relative':
      return convertUrlToRelativeURL(url, baseUrl)
    case 'root-relative':
      return convertUrlToRootRelativeURL(url, baseUrl)
    case 'original':
      return url
  }
}

export * from './absolute'
export * from './relative'
export * from './root-relative'
