import URI from 'urijs'

export function convertURLToRelativeURL(
  url: string
, absoluteBaseURL: string
): string {
  const absoluteBaseURI = new URI(absoluteBaseURL)
  const uri = new URI(url)

  if (uri.origin() === absoluteBaseURI.origin()) {
    return uri
      .relativeTo(absoluteBaseURL)
      .href()
  } else {
    return url
  }
}
