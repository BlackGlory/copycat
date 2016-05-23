'use strict'

declare function require(name: string) : any

import * as Promise from 'bluebird'
import sanitizeHtml = require('sanitize-html')

let toMarkdown = require('to-markdown')

const TAB_URL_TO_MARKDOWN = 'TAB_URL_TO_MARKDOWN',
      TAB_URL_TO_HTML = 'TAB_URL_TO_HTML',
      LINK_TO_MARKDOWN = 'LINK_TO_MARKDOWN',
      LINK_TO_HTML = 'LINK_TO_HTML',
      SELECTION_TO_MARKDOWN = 'SELECTION_TO_MARKDOWN',
      SELECTION_TO_MARKDOWN_WITHOUT_HTML = 'SELECTION_TO_MARKDOWN_WITHOUT_HTML',
      SELECTION_TO_HTML = 'SELECTION_TO_HTML',
      SELECTION_TO_HTML_LINK_ONLY = 'SELECTION_TO_HTML_LINK_ONLY',
      SELECTION_TO_PLAIN = 'SELECTION_TO_PLAIN',
      IMAGE_TO_MARKDOWN = 'IMAGE_TO_MARKDOWN',
      IMAGE_TO_HTML = 'IMAGE_TO_HTML',
      IMAGE_TO_DATA_URI_JPEG = 'IMAGE_TO_DATA_URI_JPEG',
      IMAGE_TO_DATA_URI_PNG = 'IMAGE_TO_DATA_URI_PNG',
      AUDIO_TO_HTML = 'AUDIO_TO_HTML',
      VIDEO_TO_HTML = 'VIDEO_TO_HTML'

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

function createMenus(...contexts: string[]) : (createPropertiesList: chrome.contextMenus.CreateProperties[]) => void {
  return createPropertiesList =>
    createPropertiesList.forEach(createProperties =>
      chrome.contextMenus.create(Object.assign({}, createProperties, { contexts: contexts })))
}

const sendMessage = Promise.promisify<any, number, any>(
  (tabId: number, message: any, responseCallback?: (error: any, response: any) => void) =>
    chrome.tabs.sendMessage(tabId, message, response =>
      responseCallback(null, response)
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
      setClipboard(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })))
    },
    async SELECTION_TO_MARKDOWN_WITHOUT_HTML() {
      setClipboard(toMarkdown(await sendMessage(tab.id, { type: 'selection-html' })).replace(/<\/?[^>]+(>|$)/g, ''))
    },
    async SELECTION_TO_HTML() {
      setClipboard(await sendMessage(tab.id, { type: 'selection-html' }))
    },
    async SELECTION_TO_HTML_LINK_ONLY() {
      setClipboard(sanitizeHtml(await sendMessage(tab.id, { type: 'selection-html' }), {
        allowedTags: ['a'],
        allowedAttributes: {
          'a': ['href']
        }
      }))
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
    },
    VIDEO_TO_HTML({ mediaType, srcUrl }) {
      if (mediaType === 'video') {
        setClipboard(`<video controls="controls" src="${srcUrl}"></video>`)
      }
    }
  })[info.menuItemId](info)
})
