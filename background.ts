'use strict'

declare function require(name: string) : any

import * as Promise from 'bluebird'
import sanitizeHtml = require('sanitize-html')

let toMarkdown = require('to-markdown')

const SELECTION_TO_MARKDOWN = 'SELECTION_TO_MARKDOWN',
      SELECTION_TO_MARKDOWN_WITHOUT_HTML = 'SELECTION_TO_MARKDOWN_WITHOUT_HTML',
      SELECTION_TO_HTML = 'SELECTION_TO_HTML',
      SELECTION_TO_HTML_LINK_ONLY = 'SELECTION_TO_HTML_LINK_ONLY',
      SELECTION_TO_PLAIN = 'SELECTION_TO_PLAIN',
      IMAGE_TO_DATA_URI_JPEG = 'IMAGE_TO_DATA_URI_JPEG',
      IMAGE_TO_DATA_URI_PNG = 'IMAGE_TO_DATA_URI_PNG'

function setClipboard(text: string) : void {
  console.log(text)
  let textarea = document.createElement('textarea')
  textarea.textContent = text
  let body = document.querySelector('body')
  body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy', false, null)
  body.removeChild(textarea)
}

function getDataURI(src: string, encoder: string = 'jpeg') : Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let img = new Image()
    img.onload = function() {
      let canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      canvas.getContext('2d').drawImage(this, 0, 0)
      resolve(canvas.toDataURL(`image/${encoder}`, 1))
    }
    img.onerror = reject
    img.src = src
  })
}

const sendMessage = Promise.promisify<any, number, any>(
  (tabId: number, message: any, responseCallback?: (error: any, response: any) => void) =>
    chrome.tabs.sendMessage(tabId, message, response =>
      responseCallback(null, response)
    )
)

chrome.contextMenus.create({
  id: SELECTION_TO_MARKDOWN,
  title: 'Selection to Markdown',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_MARKDOWN_WITHOUT_HTML,
  title: 'Selection to Markdown(without HTML)',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: 'separator1',
  type: 'separator',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_HTML,
  title: 'Selection to HTML',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_HTML_LINK_ONLY,
  title: 'Selection to HTML(link only)',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: 'separator2',
  type: 'separator',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_PLAIN,
  title: 'Selection to Plain',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: IMAGE_TO_DATA_URI_JPEG,
  title: 'Image to Data URI(JPEG)',
  contexts: ['image']
})

chrome.contextMenus.create({
  id: IMAGE_TO_DATA_URI_PNG,
  title: 'Image to Data URI(PNG)',
  contexts: ['image']
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case SELECTION_TO_MARKDOWN:
      setClipboard(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })))
      break
    case SELECTION_TO_MARKDOWN_WITHOUT_HTML:
      setClipboard(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })).replace(/<\/?[^>]+(>|$)/g, ''))
      break
    case SELECTION_TO_HTML:
      setClipboard(await sendMessage(tab.id, { type: 'selection-html' }))
      break
    case SELECTION_TO_HTML_LINK_ONLY:
      setClipboard(sanitizeHtml(await sendMessage(tab.id, { type: 'selection-html' }), {
        allowedTags: ['a'],
        allowedAttributes: {
          'a': ['href']
        }
      }))
      break
    case SELECTION_TO_PLAIN:
      setClipboard(await sendMessage(tab.id, { type: 'selection-text'}))
      break
    case IMAGE_TO_DATA_URI_JPEG:
      if (info.mediaType === 'image') {
        setClipboard(await getDataURI(info.srcUrl, 'jpeg'))
      }
    case IMAGE_TO_DATA_URI_PNG:
      if (info.mediaType === 'image') {
        setClipboard(await getDataURI(info.srcUrl, 'png'))
      }
      break
    default:
  }
})
