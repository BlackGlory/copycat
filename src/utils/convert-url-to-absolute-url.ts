export function convertURLToAbsoluteURL(
  url: string
, absoluteBaseURL: string
): string {
  return new URL(url, absoluteBaseURL)
    .href
}
