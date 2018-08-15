export function convertUrlToVideoHTML(url: string): string {
  return `<video controls src="${ url }"></video>`
}

export default convertUrlToVideoHTML
