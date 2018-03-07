import beautify = require('js-beautify')

export function beautifyHTML(html: string): string {
  return beautify.html(html)
}

export function setClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.textContent = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy', false, null)
  document.body.removeChild(textarea)
}

export async function getSelectionHTML(tabId: number, frameId: number = 0): Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'selection-html' }, { frameId })
}

export async function getSelectionText(tabId: number, frameId: number = 0): Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'selection-text' }, { frameId })
}

export async function getActiveElementContent(tabId: number, frameId: number = 0): Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'active-element-content' }, { frameId })
}

export async function getDocumentTitle(tabId: number, frameId: number = 0): Promise<string> {
  return await browser.tabs.sendMessage(tabId, { type: 'document-title' }, { frameId })
}

export function removeExtraLine(text: string): string {
  return text.replace(/^\s+^/mg, '\n').replace(/$\s+$/mg, '\n')
}

export function getDataURI(src: string, encoder?: string, quality?: number): Promise<string> {
  if (encoder) {
    return new Promise<string>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        canvas.getContext('2d')!.drawImage(img, 0, 0)
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

export async function queryAllInjectableTabs(): Promise<browser.tabs.Tab[]> {
  const invalidList = [
    'about:'
  , 'browser:'
  , 'view-source:'
  , 'chrome:'
  , 'chrome-error:'
  , 'https://chrome.google.com/'
  ]
  const tabs = await browser.tabs.query({})
  return tabs.filter(({ url = '' }) => {
    return invalidList.every(invalid => !url.startsWith(invalid))
  })
}

export type UrlFormat = 'original'|'absolute'
export type MarkdownFlavor = 'commonmark'|'gfm'|'ghost'

export interface IConfig {
  urlFormat: UrlFormat
  markdownFlavor: MarkdownFlavor
}

function createDefaultConfig(): IConfig {
  return {
    urlFormat: 'absolute'
  , markdownFlavor: 'gfm'
  }
}

export function loadConfigure(): IConfig {
  const config = localStorage.getItem('config')
  if (config) {
    return JSON.parse(config)
  }
  return createDefaultConfig()
}

export function saveConfigure(config: IConfig) {
  localStorage.setItem('config', JSON.stringify(config))
}
