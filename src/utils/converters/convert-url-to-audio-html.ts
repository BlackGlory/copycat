export function convertUrlToAudioHTML(url: string): string {
  return `<audio controls src="${url}"></audio>`
}
