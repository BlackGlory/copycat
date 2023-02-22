export function convertURLToAudioHTML(url: string): string {
  return `<audio controls src="${url}"></audio>`
}
