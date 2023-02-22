import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI, ImageFormat } from '@src/contract.js'
import { Awaitable } from '@blackglory/prelude'
import { pipeAsync } from 'extra-utils'
import { offscreenClient } from './offscreen-client.js'
import { convertHTMLToMarkdown } from './convert-html-to-markdown.js'
import { formatURLsInHTML } from './format-links-in-html.js'
import { formatURL } from './format-url.js'

export type ContextMenusClickHandler = (
  info: browser.Menus.OnClickData
, tab?: browser.Tabs.Tab
) => Awaitable<string | undefined>

export type CommandComplicateHandler = (
  info: Record<string, any>
, tab?: browser.Tabs.Tab
) => Awaitable<string | undefined>

interface IHandlers {
  [menuItemId: string]: ContextMenusClickHandler | CommandComplicateHandler
}

export const handlers: IHandlers = {
  ['TAB_URL_TO_PLAIN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkPlain(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_MARKDOWN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkMarkdown(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_HTML']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_BBCODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkBBCode(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_ORG_MODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkOrgMode(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_ASCII_DOC']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertURLToLinkAsciiDoc(tab.url, tab.title)
    }
  })
, ['FRAME_URL_TO_PLAIN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertURLToLinkPlain(url, title)
      } else {
        return await offscreenClient.convertURLToLinkPlain(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertURLToLinkMarkdown(url, title)
      } else {
        return await offscreenClient.convertURLToLinkMarkdown(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(info.frameUrl, tab.url)
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertURLToLinkHTML(url, title)
      } else {
        return await offscreenClient.convertURLToLinkHTML(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.frameUrl
        , tab.url
        )
        const title = await client.getDocumentTitle()
        return await offscreenClient.convertURLToLinkBBCode(url, title)
      } else {
        return await offscreenClient.convertURLToLinkBBCode(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_ORG_MODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertURLToLinkOrgMode(url, title)
      } else {
        return await offscreenClient.convertURLToLinkOrgMode(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_ASCII_DOC']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertURLToLinkAsciiDoc(url, title)
      } else {
        return await offscreenClient.convertURLToLinkAsciiDoc(info.frameUrl)
      }
    }
  })
, ['LINK_TEXT']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkText) {
      return info.linkText
    }
  })
, ['LINK_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , convertHTMLToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertURLToLinkMarkdown(
          url
        , title
        )
      } else {
        return await offscreenClient.convertURLToLinkMarkdown(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['LINK_TO_ORG_MODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , convertHTMLToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertURLToLinkOrgMode(url, title)
      } else {
        return await offscreenClient.convertURLToLinkOrgMode(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['LINK_TO_ASCII_DOC']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , convertHTMLToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertURLToLinkAsciiDoc(url, title)
      } else {
        return await offscreenClient.convertURLToLinkAsciiDoc(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['LINK_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        )
        return await offscreenClient.convertURLToLinkHTML(
          url
        , title
        )
      } else {
        return await offscreenClient.convertURLToLinkHTML(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['LINK_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , offscreenClient.convertHTMLToBBCode
        )
        return await offscreenClient.convertURLToLinkBBCode(
          url
        , title
        )
      } else {
        return await offscreenClient.convertURLToLinkBBCode(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['IMAGE_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertURLToImageMarkdown(url)
      } else {
        return await offscreenClient.convertURLToImageMarkdown(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.JPEG)
      , offscreenClient.convertURLToImageMarkdown
      )
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.PNG)
      , offscreenClient.convertURLToImageMarkdown
      )
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.WebP)
      , offscreenClient.convertURLToImageMarkdown
      )
    }
  })
, ['IMAGE_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertURLToImageHTML(url)
      } else {
        return await offscreenClient.convertURLToImageHTML(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.JPEG)
      , offscreenClient.convertURLToImageHTML
      )
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.PNG)
      , offscreenClient.convertURLToImageHTML
      )
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await pipeAsync(
        srcUrl
      , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.WebP)
      , offscreenClient.convertURLToImageHTML
      )
    }
  })
, ['IMAGE_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertURLToImageBBCode(url)
      } else {
        return await offscreenClient.convertURLToImageBBCode(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_DATA_URI_RAW']: createContextMenusClickHandler(async (
    { mediaType, srcUrl }
  , tab
  ) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertURLToImageDataURI(srcUrl)
    }
  })
, ['IMAGE_TO_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertURLToImageDataURI(
        srcUrl
      , ImageFormat.JPEG
      )
    }
  })
, ['IMAGE_TO_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.PNG)
    }
  })
, ['IMAGE_TO_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertURLToImageDataURI(
        srcUrl
      , ImageFormat.WebP
      )
    }
  })
, ['AUDIO_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertURLToAudioHTML(url)
      } else {
        return await offscreenClient.convertURLToAudioHTML(info.srcUrl)
      }
    }
  })
, ['VIDEO_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return offscreenClient.convertURLToVideoHTML(url)
      } else {
        return offscreenClient.convertURLToVideoHTML(info.srcUrl)
      }
    }
  })
, ['SELECTION_TO_MARKDOWN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageURL ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHTMLToSafeHTML
      , html => formatURLsInHTML(html, baseURL)
      , offscreenClient.convertHTMLToBeautifyHTML
      , convertHTMLToMarkdown
      , offscreenClient.convertMarkdownToBeautifyMarkdown
      )
    }
  })
, ['SELECTION_TO_HTML']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageURL ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHTMLToSafeHTML
      , html => formatURLsInHTML(html, baseURL)
      , offscreenClient.convertHTMLToBeautifyHTML
      )
    }
  })
, ['SELECTION_TO_HTML_ONLY_A_TAG']: createCommandComplicateHandler(async (
    info
  , tab
  ) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageURL ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHTMLToSafeHTML
      , html => formatURLsInHTML(html, baseURL)
      , offscreenClient.convertHTMLToOnlyATagHTML
      , offscreenClient.convertHTMLToBeautifyHTML
      )
    }
  })
, ['SELECTION_TO_HTML_NO_ATTR']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await tabClient.getSelectionHTML()
      return await pipeAsync(
        html
      , offscreenClient.convertHTMLToSafeHTML
      , offscreenClient.convertHTMLToNoAttrHTML
      , offscreenClient.convertHTMLToBeautifyHTML
      )
    }
  })
, ['SELECTION_TO_BBCODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageURL ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHTMLToSafeHTML
      , html => formatURLsInHTML(html, baseURL)
      , offscreenClient.convertHTMLToBeautifyHTML
      , offscreenClient.convertHTMLToBBCode
      )
    }
  })
, ['SELECTION_TO_PLAIN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return await tabClient.getSelectionText()
    }
  })
, ['SELECTION_TO_PLAIN_TRIMMED']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return await offscreenClient.convertTextToTrimmedText(text)
    }
  })
, ['SELECTION_TO_RAW_STRING']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return await offscreenClient.convertTextToRawString(text)
    }
  })
}

function createContextMenusClickHandler(
  handler: ContextMenusClickHandler
): ContextMenusClickHandler {
  return handler
}

function createCommandComplicateHandler(
  handler: CommandComplicateHandler
): CommandComplicateHandler {
  return handler
}
