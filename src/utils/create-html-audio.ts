export function createHTMLAudio(url: string): string {
  return `<audio controls src="${url}"></audio>`
}
