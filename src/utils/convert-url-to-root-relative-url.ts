import URI from 'urijs'
import { isRelativeURL } from '@utils/is-relative-url.js'

export function convertURLToRootRelativeURL(
  url: string
, absoluteBaseURL: string
): string {
  if (isRelativeURL(url)) {
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
