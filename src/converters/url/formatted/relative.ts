import { relative } from 'path'

export function convertUrlToRelativeURL(absoluteUrl: string, baseUrl: string): string {
  try {
    const absoluteUrlObj = new URL(absoluteUrl)
    const baseUrlObj = new URL(baseUrl)
    if (absoluteUrlObj.origin === baseUrlObj.origin) {
      return relative(baseUrlObj.pathname, absoluteUrlObj.pathname)
    } else {
      return absoluteUrl
    }
  } catch (e) {
    return absoluteUrl
  }
}

export default convertUrlToRelativeURL
