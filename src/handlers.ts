import toMarkdown = require('to-markdown')
import sanitizeHtml = require('sanitize-html')
import * as ent from 'ent'
import {
  PAGE_URL_TO_MARKDOWN
, PAGE_URL_TO_HTML
, LINK_TO_MARKDOWN
, LINK_TO_HTML
, SELECTION_TO_MARKDOWN
, SELECTION_TO_MARKDOWN_WITHOUT_HTML
, SELECTION_TO_HTML
, SELECTION_TO_HTML_LINK_ONLY
, SELECTION_TO_PLAIN
, SELECTION_TO_RAW_STRING
, IMAGE_TO_MARKDOWN
, IMAGE_TO_MARKDOWN_DATA_URI_JPEG
, IMAGE_TO_MARKDOWN_DATA_URI_PNG
, IMAGE_TO_MARKDOWN_DATA_URI_WEBP
, IMAGE_TO_HTML
, IMAGE_TO_HTML_DATA_URI_JPEG
, IMAGE_TO_HTML_DATA_URI_PNG
, IMAGE_TO_HTML_DATA_URI_WEBP
, IMAGE_TO_DATA_URI_RAW
, IMAGE_TO_DATA_URI_JPEG
, IMAGE_TO_DATA_URI_PNG
, IMAGE_TO_DATA_URI_WEBP
, AUDIO_TO_HTML
, VIDEO_TO_HTML
} from './symbols'
import {
  getSelectionHTML
, getSelectionText
, getActiveElementContent
, getActiveImageDataURI
, removeExtraLine
, getDataURI
} from './utils'

interface Handler {
  (info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab): string|void|Promise<string|void>
}

interface Handlers {
  [menuItemId: string]: Handler
}

export default {
  async [PAGE_URL_TO_MARKDOWN](info, tab) {
    if (info.frameUrl) {
      return `[](${ info.frameUrl })`
    } else if (tab) {
      return `[${ tab.title }](${ tab.url })`
    }
  }
, async [PAGE_URL_TO_HTML](info, tab) {
    if (info.frameUrl) {
      return `<a href="${ info.frameUrl }"></a>`
    } else if (tab) {
      return `<a href="${ tab.url }">${ tab.title }</a>`
    }
  }
, async [LINK_TO_MARKDOWN]({ linkUrl }, tab) {
    if (tab && tab.id) {
      return `[${ await getActiveElementContent(tab.id) }](${ linkUrl })`
    } else {
      return `[](${ linkUrl })`
    }
  }
, async [LINK_TO_HTML]({ linkUrl }, tab) {
    if (tab && tab.id) {
      return `<a href="${ linkUrl }">${ await getActiveElementContent(tab.id) }</a>`
    } else {
      return `<a href="${ linkUrl }"></a>`
    }
  }
, async [SELECTION_TO_MARKDOWN](_, tab) {
    if (tab && tab.id) {
      return ent.decode(removeExtraLine(toMarkdown(sanitizeHtml(await getSelectionHTML(tab.id), {
        allowedTags: false
      , allowedAttributes: false
      , nonTextTags: ['style', 'script', 'noscript']
      }))))
    }
  }
, async [SELECTION_TO_MARKDOWN_WITHOUT_HTML](_, tab) {
    if (tab && tab.id) {
      return ent.decode(removeExtraLine(sanitizeHtml(toMarkdown(await getSelectionHTML(tab.id)), {
        allowedTags: []
      , allowedAttributes: {}
      , nonTextTags: ['style', 'script', 'noscript']
      })))
    }
  }
, async [SELECTION_TO_HTML](_, tab) {
    if (tab && tab.id) {
      return ent.decode(sanitizeHtml(await getSelectionHTML(tab.id), {
        allowedTags: false
      , allowedAttributes: false
      , nonTextTags: ['style', 'script', 'noscript']
      }))
    }
  },
  async [SELECTION_TO_HTML_LINK_ONLY](_, tab) {
    if (tab && tab.id) {
      return ent.decode(sanitizeHtml(await getSelectionHTML(tab.id), {
        allowedTags: ['a']
      , allowedAttributes: {
          'a': ['href']
        }
      , nonTextTags: ['style', 'script', 'noscript']
      }))
    }
  }
, async [SELECTION_TO_PLAIN](_, tab) {
    if (tab && tab.id) {
      return await getSelectionText(tab.id)
    }
  }
, async [SELECTION_TO_RAW_STRING](_, tab) {
    if (tab && tab.id) {
      return (await getSelectionText(tab.id))
        .replace(/\\/g, String.raw`\\`)
        .replace(/\r/g, String.raw`\r`)
        .replace(/\t/g, String.raw`\t`)
        .replace(/\f/g, String.raw`\f`)
        .replace(/\n/g, String.raw`\n`)
        .replace(/\'/g, String.raw`\'`)
        .replace(/\"/g, String.raw`\"`)
    }
  }
, [IMAGE_TO_MARKDOWN]({ mediaType, srcUrl }) {
    if (mediaType === 'image') {
      return `![](${ srcUrl })`
    }
  }
, async [IMAGE_TO_MARKDOWN_DATA_URI_JPEG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `![](${ await getDataURI(srcUrl, 'jpeg') })`
    }
  }
, async [IMAGE_TO_MARKDOWN_DATA_URI_PNG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `![](${ await getDataURI(srcUrl, 'png') })`
    }
  }
, async [IMAGE_TO_MARKDOWN_DATA_URI_WEBP]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `![](${ await getDataURI(srcUrl, 'webp') })`
    }
  }
, [IMAGE_TO_HTML]({ mediaType, srcUrl }) {
    if (mediaType === 'image') {
      return `<img src="${ srcUrl }" />`
    }
  }
, async [IMAGE_TO_HTML_DATA_URI_JPEG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `<img src="${ await getDataURI(srcUrl, 'jpeg') }" />`
    }
  }
, async [IMAGE_TO_HTML_DATA_URI_PNG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `<img src="${ await getDataURI(srcUrl, 'png') }" />`
    }
  }
, async [IMAGE_TO_HTML_DATA_URI_WEBP]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return `<img src="${ await getDataURI(srcUrl, 'webp') }" />`
    }
  }
, async [IMAGE_TO_DATA_URI_RAW]({ mediaType, srcUrl }, tab) {
    if (mediaType === 'image' && srcUrl) {
      return await getDataURI(srcUrl)
    }
  }
, async [IMAGE_TO_DATA_URI_JPEG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return await getDataURI(srcUrl, 'jpeg')
    }
  }
, async [IMAGE_TO_DATA_URI_PNG]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return await getDataURI(srcUrl, 'png')
    }
  }
, async [IMAGE_TO_DATA_URI_WEBP]({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return await getDataURI(srcUrl, 'webp')
    }
  }
, [AUDIO_TO_HTML]({ mediaType, srcUrl }) {
    if (mediaType === 'audio') {
      return `<audio controls src="${ srcUrl }"></audio>`
    }
  }
, [VIDEO_TO_HTML]({ mediaType, srcUrl }) {
    if (mediaType === 'video') {
      return `<video controls src="${ srcUrl }"></video>`
    }
  }
} as Handlers
