'use strict'

declare function require(name: string) : any

import * as Promise from 'bluebird'
import sanitizeHtml = require('sanitize-html')

let toMarkdown = require('to-markdown')
  , ent = require('ent')

const TAB_URL_TO_MARKDOWN = 'TAB_URL_TO_MARKDOWN'
const TAB_URL_TO_HTML = 'TAB_URL_TO_HTML'
const LINK_TO_MARKDOWN = 'LINK_TO_MARKDOWN'
const LINK_TO_HTML = 'LINK_TO_HTML'
const SELECTION_TO_MARKDOWN = 'SELECTION_TO_MARKDOWN'
const SELECTION_TO_MARKDOWN_WITHOUT_HTML = 'SELECTION_TO_MARKDOWN_WITHOUT_HTML'
const SELECTION_TO_HTML = 'SELECTION_TO_HTML'
const SELECTION_TO_HTML_LINK_ONLY = 'SELECTION_TO_HTML_LINK_ONLY'
const SELECTION_TO_PLAIN = 'SELECTION_TO_PLAIN'
const IMAGE_TO_MARKDOWN = 'IMAGE_TO_MARKDOWN'
const IMAGE_TO_HTML = 'IMAGE_TO_HTML'
const IMAGE_TO_DATA_URI_JPEG = 'IMAGE_TO_DATA_URI_JPEG'
const IMAGE_TO_DATA_URI_PNG = 'IMAGE_TO_DATA_URI_PNG'
const AUDIO_TO_HTML = 'AUDIO_TO_HTML'

function setClipboard(text: string) : void {
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

function createMenus(...contexts: string[]) : (createPropertiesList: chrome.contextMenus.CreateProperties[]) => void {
  return createPropertiesList => {
    for (let createProperties of createPropertiesList) {
      chrome.contextMenus.create(Object.assign({}, createProperties, { contexts: contexts }))
    }
  }
}

function removeExtraLine(text: string) : string {
  return text.replace(/^\s+^/mg, '\n').replace(/$\s+$/mg, '\n')
}

const sendMessage = Promise.promisify<any, number, any>(
  (tabId: number, message: any, responseCallback?: (error: any, response: any) => void) =>
    chrome.tabs.sendMessage(tabId, message, response =>
      responseCallback(null, response)
    )
)

const queryTabs = Promise.promisify<any, chrome.tabs.QueryInfo>(
  (queryInfo: chrome.tabs.QueryInfo, callback?: (error: any, result: chrome.tabs.Tab[]) => void) =>
    chrome.tabs.query(queryInfo, (result: chrome.tabs.Tab[]) =>
      callback(null, result)
    )
)

createMenus('page')([
  {
    id: TAB_URL_TO_MARKDOWN,
    title: 'Tab to Markdown'
  }, {
    id: TAB_URL_TO_HTML,
    title: 'Tab to HTML'
  }
])

createMenus('link')([
  {
    id: LINK_TO_MARKDOWN,
    title: 'Link to Markdown'
  }, {
    id: LINK_TO_HTML,
    title: 'Link to HTML'
  }
])

createMenus('selection')([
  {
    id: SELECTION_TO_MARKDOWN,
    title: 'Selection to Markdown'
  }, {
    id: SELECTION_TO_MARKDOWN_WITHOUT_HTML,
    title: 'Selection to Markdown(without HTML)'
  }, {
    id: 'separator1',
    type: 'separator'
  }, {
    id: SELECTION_TO_HTML,
    title: 'Selection to HTML'
  }, {
    id: SELECTION_TO_HTML_LINK_ONLY,
    title: 'Selection to HTML(link only)'
  }, {
    id: 'separator2',
    type: 'separator'
  }, {
    id: SELECTION_TO_PLAIN,
    title: 'Selection to Plain'
  }
])

createMenus('image')([
  {
    id: IMAGE_TO_MARKDOWN,
    title: 'Image to Markdown'
  }, {
    id: IMAGE_TO_HTML,
    title: 'Image to HTML'
  }, {
    id: IMAGE_TO_DATA_URI_JPEG,
    title: 'Image to Data URI(JPEG)'
  }, {
    id: IMAGE_TO_DATA_URI_PNG,
    title: 'Image to Data URI(PNG)'
  }
])

createMenus('audio')([
  {
    id: AUDIO_TO_HTML,
    title: 'Audio to HTML'
  }
])

chrome.contextMenus.onClicked.addListener((info, tab) => {
  ({
    TAB_URL_TO_MARKDOWN() {
      setClipboard(`[${tab.title}](${tab.url})`)
    },
    TAB_URL_TO_HTML() {
      setClipboard(`<a href="${tab.url}">${tab.title}</a>`)
    },
    LINK_TO_MARKDOWN({ linkUrl }) {
      setClipboard(`[link](${linkUrl})`)
    },
    LINK_TO_HTML({ linkUrl }) {
      setClipboard(`<a href="${linkUrl}">link</a>`)
    },
    async SELECTION_TO_MARKDOWN() {
      setClipboard(ent.decode(removeExtraLine(toMarkdown(sanitizeHtml(await sendMessage(tab.id, { type: 'selection-html' }), {
        allowedTags: false,
        allowedAttributes: false,
        nonTextTags: ['style', 'script', 'noscript']
      })))))
    },
    async SELECTION_TO_MARKDOWN_WITHOUT_HTML() {
      setClipboard(ent.decode(removeExtraLine(sanitizeHtml(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })), {
        allowedTags: [],
        allowedAttributes: [],
        nonTextTags: ['style', 'script', 'noscript']
      }))))
    },
    async SELECTION_TO_HTML() {
      setClipboard(ent.decode(sanitizeHtml(await sendMessage(tab.id, { type: 'selection-html' }), {
        allowedTags: false,
        allowedAttributes: false,
        nonTextTags: ['style', 'script', 'noscript']
      })))
    },
    async SELECTION_TO_HTML_LINK_ONLY() {
      setClipboard(ent.decode(sanitizeHtml(await sendMessage(tab.id, { type: 'selection-html' }), {
        allowedTags: ['a'],
        allowedAttributes: {
          'a': ['href']
        },
        nonTextTags: ['style', 'script', 'noscript']
      })))
    },
    async SELECTION_TO_PLAIN() {
      setClipboard(await sendMessage(tab.id, { type: 'selection-text'}))
    },
    IMAGE_TO_MARKDOWN({ mediaType, srcUrl }) {
      if (mediaType === 'image') {
        setClipboard(`![](${srcUrl})`)
      }
    },
    IMAGE_TO_HTML({ mediaType, srcUrl }) {
      if (mediaType === 'image') {
        setClipboard(`<img src="${srcUrl}" />`)
      }
    },
    async IMAGE_TO_DATA_URI_JPEG({ mediaType, srcUrl }) {
      if (mediaType === 'image') {
        setClipboard(await getDataURI(srcUrl, 'jpeg'))
      }
    },
    async IMAGE_TO_DATA_URI_PNG({ mediaType, srcUrl }) {
      if (mediaType === 'image') {
        setClipboard(await getDataURI(srcUrl, 'png'))
      }
    },
    AUDIO_TO_HTML({ mediaType, srcUrl }) {
      if (mediaType === 'audio') {
        setClipboard(`<audio controls="controls" src="${srcUrl}"></audio>`)
      }
    }
  })[info.menuItemId](info)
})

chrome.runtime.onInstalled.addListener(async (details) => {
  let tabs = await queryTabs({})
  for (let { id } of tabs) {
    chrome.tabs.executeScript(id, { file: 'inject.js' })
  }
})