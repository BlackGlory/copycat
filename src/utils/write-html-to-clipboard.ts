import { textToBlob } from 'extra-blob'

export async function writeHTMLToClipboard(html: string): Promise<null> {
  try {
    const mimeType = 'text/html'
    const blob = textToBlob(html, mimeType)
    const clipboardItem = new ClipboardItem({ [mimeType]: blob })
    await navigator.clipboard.write([clipboardItem])
  } catch {
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)
    container.focus()
    document.execCommand('SelectAll', false)
    document.execCommand('Copy', false)
    document.body.removeChild(container)
  }

  return null
}
