export function createOrgModeLink(url: string, text?: string): string {
  if (text) {
    return `[[${url}][${text}]]`
  } else {
    return url
  }
}
