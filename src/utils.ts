export function setClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.textContent = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy', false, null)
  document.body.removeChild(textarea)
}

export async function getSelectionHTML(tabId: number) : Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'selection-html' })
}

export async function getSelectionText(tabId: number) : Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'selection-text' })
}

export async function getActiveElementContent(tabId: number) : Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'active-element-content' })
}

export async function getActiveImageDataURI(tabId: number) : Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'active-image-datauri' })
}

export function removeExtraLine(text: string) : string {
  return text.replace(/^\s+^/mg, '\n').replace(/$\s+$/mg, '\n')
}

export function getDataURI(src: string, encoder?: string, quality?: number) : Promise<string> {
  if (encoder) {
    return new Promise<string>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ;(canvas.getContext('2d') as CanvasRenderingContext2D).drawImage(img, 0, 0)
        resolve(canvas.toDataURL(`image/${ encoder }`, quality))
      }
      img.onerror = reject
      img.src = src
    })
  } else {
    return new Promise<string>(async (resolve, reject) => {
      const blob = await fetch(src).then(res => res.blob())
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}

export async function queryAllInjectableTabs() : Promise<browser.tabs.Tab[]> {
  const invalidList = [
    "about:"
  , "browser:"
  , "view-source:"
  , "chrome:"
  , "chrome-error:"
  , "https://chrome.google.com/"
  ]
  const tabs = await browser.tabs.query({})
  return tabs.filter(({ url = '' }) => {
    return invalidList.every(invalid => !url.startsWith(invalid))
  })
}
