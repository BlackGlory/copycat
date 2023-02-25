export function isRelativeURL(url: string): boolean {
  try {
    new URL(url)
    return false
  } catch (e) {
    return true
  }
}
