export async function writeTextToClipboard(text: string): Promise<null> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.textContent = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('Copy', false)
    document.body.removeChild(textarea)
  }

  return null
}
