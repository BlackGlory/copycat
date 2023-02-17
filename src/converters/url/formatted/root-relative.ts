export function convertUrlToRootRelativeURL(
  url: string
, baseUrl: string
): string {
  try {
    const urlObj = new URL(url, baseUrl)
    const baseUrlObj = new URL(baseUrl)
    if (urlObj.origin === baseUrlObj.origin) {
      return urlObj.pathname
    } else {
      return url
    }
  } catch (e) {
    return url
  }
}
