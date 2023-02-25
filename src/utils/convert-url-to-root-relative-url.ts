import URI from 'urijs'

export function convertURLToRootRelativeURL(
  url: string
, absoluteBaseURL: string
): string {
  if (isRelative(url)) {
    return new URI(url, absoluteBaseURL)
      .resource()
  } else {
    const absoluteBaseURI = new URI(absoluteBaseURL)
    const uri = new URI(url)
    if (uri.origin() === absoluteBaseURI.origin()) {
      return uri
        .absoluteTo(absoluteBaseURL)
        .resource()
    } else {
      return url
    }
  }
}

function isRelative(url: string): boolean {
  try {
    new URL(url)
    return false
  } catch {
    return true
  }
}
