export function convertURLToVideoHTML(url: string): string {
  return `<video controls src="${url}"></video>`
}
