import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI, ImageFormat } from '@src/contract.js'
import { Awaitable } from '@blackglory/prelude'
import { pipeAsync } from 'extra-utils'
import { offscreenClient } from './offscreen-client.js'
import { convertHtmlToFormattedLinkHTML } from './convert-html-to-formatted-link-html.js'
import { convertHtmlToMarkdown } from './convert-html-to-markdown.js'
import { convertUrlToFormattedURL } from './convert-url-to-formatted-url.js'

export type ContextMenusClickHandler = (
  info: browser.Menus.OnClickData
, tab?: browser.Tabs.Tab
) => Awaitable<string | undefined>

export type CommandComplicateHandler = (
  info: Record<string, any>
, tab?: browser.Tabs.Tab
) => Awaitable<string | undefined>

interface Handlers {
  [menuItemId: string]: ContextMenusClickHandler | CommandComplicateHandler
}

export const handlers: Handlers = {
  ['TAB_URL_TO_PLAIN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkPlain(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_MARKDOWN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkMarkdown(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_HTML']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkHTML(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_BBCODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkBBCode(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_ORG_MODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkOrgMode(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_ASCII_DOC']: createCommandComplicateHandler(async (info, tab) => {
    if (tab?.url) {
      return await offscreenClient.convertUrlToLinkAsciiDoc(tab.url, tab.title)
    }
  })
, ['FRAME_URL_TO_PLAIN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await convertUrlToFormattedURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkPlain(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkPlain(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkMarkdown(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkMarkdown(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkHTML(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkHTML(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(
          info.frameUrl
        , tab.url
        )
        const title = await client.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkBBCode(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkBBCode(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkOrgMode(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkOrgMode(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(
          info.frameUrl
        , tab.url
        )
        const title = await tabClient.getDocumentTitle()
        return await offscreenClient.convertUrlToLinkAsciiDoc(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkAsciiDoc(info.frameUrl)
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

        const url = await convertUrlToFormattedURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHtmlToSafeHTML
        , offscreenClient.convertHtmlToBeautifyHTML
        , convertHtmlToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertUrlToLinkMarkdown(
          url
        , title
        )
      } else {
        return await offscreenClient.convertUrlToLinkMarkdown(
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

        const url = await convertUrlToFormattedURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHtmlToSafeHTML
        , offscreenClient.convertHtmlToBeautifyHTML
        , convertHtmlToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertUrlToLinkOrgMode(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkOrgMode(
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

        const url = await convertUrlToFormattedURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHtmlToSafeHTML
        , offscreenClient.convertHtmlToBeautifyHTML
        , convertHtmlToMarkdown
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return await offscreenClient.convertUrlToLinkAsciiDoc(url, title)
      } else {
        return await offscreenClient.convertUrlToLinkAsciiDoc(
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

        const url = await convertUrlToFormattedURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHtmlToSafeHTML
        , offscreenClient.convertHtmlToBeautifyHTML
        )
        return await offscreenClient.convertUrlToLinkHTML(
          url
        , title
        )
      } else {
        return await offscreenClient.convertUrlToLinkHTML(
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

        const url = await convertUrlToFormattedURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHtmlToSafeHTML
        , offscreenClient.convertHtmlToBeautifyHTML
        , offscreenClient.convertHtmlToBBCode
        )
        return await offscreenClient.convertUrlToLinkBBCode(
          url
        , title
        )
      } else {
        return await offscreenClient.convertUrlToLinkBBCode(
          info.linkUrl
        , info.linkText
        )
      }
    }
  })
, ['IMAGE_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await convertUrlToFormattedURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertUrlToImageMarkdown(url)
      } else {
        return await offscreenClient.convertUrlToImageMarkdown(info.srcUrl)
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.JPEG)
      , offscreenClient.convertUrlToImageMarkdown
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.PNG)
      , offscreenClient.convertUrlToImageMarkdown
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.WebP)
      , offscreenClient.convertUrlToImageMarkdown
      )
    }
  })
, ['IMAGE_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await convertUrlToFormattedURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertUrlToImageHTML(url)
      } else {
        return await offscreenClient.convertUrlToImageHTML(info.srcUrl)
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.JPEG)
      , offscreenClient.convertUrlToImageHTML
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.PNG)
      , offscreenClient.convertUrlToImageHTML
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
      , url => offscreenClient.convertUrlToImageDataURI(url, ImageFormat.WebP)
      , offscreenClient.convertUrlToImageHTML
      )
    }
  })
, ['IMAGE_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab?.url) {
        const url = await convertUrlToFormattedURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertUrlToImageBBCode(url)
      } else {
        return await offscreenClient.convertUrlToImageBBCode(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_DATA_URI_RAW']: createContextMenusClickHandler(async (
    { mediaType, srcUrl }
  , tab
  ) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertUrlToImageDataURI(srcUrl)
    }
  })
, ['IMAGE_TO_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertUrlToImageDataURI(
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
      return await offscreenClient.convertUrlToImageDataURI(srcUrl, ImageFormat.PNG)
    }
  })
, ['IMAGE_TO_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await offscreenClient.convertUrlToImageDataURI(
        srcUrl
      , ImageFormat.WebP
      )
    }
  })
, ['AUDIO_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab?.url) {
        const url = await convertUrlToFormattedURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return await offscreenClient.convertUrlToAudioHTML(url)
      } else {
        return await offscreenClient.convertUrlToAudioHTML(info.srcUrl)
      }
    }
  })
, ['VIDEO_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab?.url) {
        const url = await convertUrlToFormattedURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return offscreenClient.convertUrlToVideoHTML(url)
      } else {
        return offscreenClient.convertUrlToVideoHTML(info.srcUrl)
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
      const baseUrl = info.frameUrl ?? info.pageUrl ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHtmlToSafeHTML
      , html => convertHtmlToFormattedLinkHTML(html, baseUrl)
      , offscreenClient.convertHtmlToBeautifyHTML
      , convertHtmlToMarkdown
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
      const baseUrl = info.frameUrl ?? info.pageUrl ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHtmlToSafeHTML
      , html => convertHtmlToFormattedLinkHTML(html, baseUrl)
      , offscreenClient.convertHtmlToBeautifyHTML
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
      const baseUrl = info.frameUrl ?? info.pageUrl ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHtmlToSafeHTML
      , html => convertHtmlToFormattedLinkHTML(html, baseUrl)
      , offscreenClient.convertHtmlToOnlyATagHTML
      , offscreenClient.convertHtmlToBeautifyHTML
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
      , offscreenClient.convertHtmlToSafeHTML
      , offscreenClient.convertHtmlToNoAttrHTML
      , offscreenClient.convertHtmlToBeautifyHTML
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
      const baseUrl = info.frameUrl ?? info.pageUrl ?? tab.url
      return await pipeAsync(
        html
      , offscreenClient.convertHtmlToSafeHTML
      , html => convertHtmlToFormattedLinkHTML(html, baseUrl)
      , offscreenClient.convertHtmlToBeautifyHTML
      , offscreenClient.convertHtmlToBBCode
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
