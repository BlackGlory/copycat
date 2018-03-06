import xss = require('xss')
import * as ent from 'ent'
import {
  TAB_URL_TO_MARKDOWN
, TAB_URL_TO_HTML
, FRAME_URL_TO_MARKDOWN
, FRAME_URL_TO_HTML
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
, getDocumentTitle
, removeExtraLine
, getDataURI
, loadConfigure
, MarkdownFlavor
} from './utils'
import { toMarkdown as toGfm, toMarkdownWithHtmlTags as toGfmHtml } from './to-markdown/gfm'
import { toMarkdown as toCommonmark, toMarkdownWithHtmlTags as toCommonmarkHtml } from './to-markdown/commonmark'
import { toMarkdown as toGhost, toMarkdownWithHtmlTags as toGhostHtml } from './to-markdown/ghost'

const toMarkdown: { [K in MarkdownFlavor]: (html: string) => string } = {
  gfm: toGfm
, commonmark: toCommonmark
, ghost: toGhost
}

const toMarkdownWithHtmlTags: { [K in MarkdownFlavor]: (html: string) => string } = {
  gfm: toGfmHtml
, commonmark: toCommonmarkHtml
, ghost: toGhostHtml
}

function tryAbsoluteUrl(base: string, relative: string) {
  try {
    return new URL(relative, base).href
  } catch (e) {
    return relative
  }
}

function isAbsoluteUrl(url: string) {
  try {
    const instance = new URL(url)
    return true
  } catch (e) {
    return false
  }
}

function getOnLinkAttr(base: string): XSS.OnTagAttrHandler {
  return (tag: string, name: string, value: string) => {
    const { urlFormat } = loadConfigure()
    if (urlFormat === 'absolute'
    && ['href', 'src'].includes(name)
    && !isAbsoluteUrl(value)) {
      return `${ name }=${ tryAbsoluteUrl(base, value) }`
    }
  }
}

type Handler = (info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab) =>
  string|void|Promise<string|void>

interface IHandlers {
  [menuItemId: string]: Handler
}

export default {
  async [TAB_URL_TO_MARKDOWN](info, tab) {
    if (tab) {
      return `[${ tab.title }](${ tab.url })`
    }
  }
, async [TAB_URL_TO_HTML](info, tab) {
    if (tab) {
      return `<a href="${ tab.url }">${ tab.title }</a>`
    }
  }
, async [FRAME_URL_TO_MARKDOWN](info, tab) {
    if (tab && tab.id) {
      return `[${ await getDocumentTitle(tab.id, info.frameId) }](${ info.frameUrl })`
    } else {
      return `[](${ info.frameUrl })`
    }
  }
, async [FRAME_URL_TO_HTML](info, tab) {
    if (tab && tab.id) {
      return `<a href="${ info.frameUrl }">${ await getDocumentTitle(tab.id, info.frameId) }</a>`
    } else {
      return `<a href="${ info.frameUrl }"></a>`
    }
  }
, async [LINK_TO_MARKDOWN](info, tab) {
    if (tab && tab.id) {
      const title = ent.decode(
        removeExtraLine(
          toMarkdown[loadConfigure().markdownFlavor](
            await getActiveElementContent(tab.id, info.frameId)
          )
        )
      )
      return `[${ title }](${ info.linkUrl })`
    } else {
      return `[](${ info.linkUrl })`
    }
  }
, async [LINK_TO_HTML](info, tab) {
    if (tab && tab.id) {
      const title = ent.decode(
        xss(await getActiveElementContent(tab.id, info.frameId), {
          stripIgnoreTagBody: true
        })
      )
      return `<a href="${ info.linkUrl }">${ title }</a>`
    } else {
      return `<a href="${ info.linkUrl }"></a>`
    }
  }
, async [SELECTION_TO_MARKDOWN](info, tab) {
    if (tab && tab.id) {
      return ent.decode(
        removeExtraLine(
          toMarkdownWithHtmlTags[loadConfigure().markdownFlavor](
            xss(await getSelectionHTML(tab.id, info.frameId), {
              stripIgnoreTagBody: ['script']
            , onTagAttr: getOnLinkAttr((info.frameUrl || info.pageUrl) as string)
            })
          )
        )
      )
    }
  }
, async [SELECTION_TO_MARKDOWN_WITHOUT_HTML](info, tab) {
    if (tab && tab.id) {
      // TODO
      return ent.decode(
        removeExtraLine(
          toMarkdown[loadConfigure().markdownFlavor](
            xss(await getSelectionHTML(tab.id, info.frameId), {
              stripIgnoreTag: true
            , onTagAttr: getOnLinkAttr((info.frameUrl || info.pageUrl) as string)
            })
          )
        )
      )
    }
  }
, async [SELECTION_TO_HTML](info, tab) {
    if (tab && tab.id) {
      return ent.decode(xss(await getSelectionHTML(tab.id, info.frameId), {
        stripIgnoreTagBody: ['script']
      , onTagAttr: getOnLinkAttr((info.frameUrl || info.pageUrl) as string)
      }))
    }
  },
  async [SELECTION_TO_HTML_LINK_ONLY](info, tab) {
    if (tab && tab.id) {
      // TODO
      return ent.decode(xss(await getSelectionHTML(tab.id, info.frameId), {
        whiteList: {
          a: ['href', 'title', 'target']
        }
      , stripIgnoreTag: true
      , onTagAttr: getOnLinkAttr((info.frameUrl || info.pageUrl) as string)
      }))
    }
  }
, async [SELECTION_TO_PLAIN](info, tab) {
    if (tab && tab.id) {
      return await getSelectionText(tab.id, info.frameId)
    }
  }
, async [SELECTION_TO_RAW_STRING](info, tab) {
    if (tab && tab.id) {
      return (await getSelectionText(tab.id, info.frameId))
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
} as IHandlers
