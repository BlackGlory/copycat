'use strict'

import * as Promise from 'bluebird'

declare function require(name: string) : any

let toMarkdown = require('to-markdown')

const SELECTION_TO_MARKDOWN = 'SELECTION_TO_MARKDOWN'
const SELECTION_TO_MARKDOWN_LINK_ONLY = 'SELECTION_TO_MARKDOWN_LINK_ONLY'
const SELECTION_TO_MARKDOWN_WITHOUT_HTML = 'SELECTION_TO_MARKDOWN_WITHOUT_HTML'
const SELECTION_TO_HTML = 'SELECTION_TO_HTML'
const SELECTION_TO_HTML_LINK_ONLY = 'SELECTION_TO_HTML_LINK_ONLY'
const SELECTION_TO_PLAIN = 'SELECTION_TO_PLAIN'
const IMAGE_TO_DATA_URI = 'IMAGE_TO_DATA_URI'

function setClipboard(text: string) : void {
  let textarea = document.createElement('textarea')
  textarea.textContent = text
  let body = document.querySelector('body')
  body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy', false, null)
  body.removeChild(textarea)
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
  id: SELECTION_TO_MARKDOWN_LINK_ONLY,
  title: 'Selection to Markdown(link only)',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_MARKDOWN_WITHOUT_HTML,
  title: 'Selection to Markdown(without HTML)',
  contexts: ['selection']
})

chrome.contextMenus.create({
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
  type: 'separator',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: SELECTION_TO_PLAIN,
  title: 'Selection to Plain',
  contexts: ['selection']
})

chrome.contextMenus.create({
  id: IMAGE_TO_DATA_URI,
  title: 'Image to Data URI',
  contexts: ['image']
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case SELECTION_TO_MARKDOWN:
      setClipboard(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })))
      break
    case SELECTION_TO_HTML:
      setClipboard(await sendMessage(tab.id, { type: 'selection-html' }))
      break
    case SELECTION_TO_PLAIN:
      setClipboard(await sendMessage(tab.id, { type: 'selection-text'}))
      break
    default:
  }
})
