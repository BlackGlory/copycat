import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract'
import { convertHtmlToBBCode } from '@converters/html/bbcode'
import { convertUrlToLinkPlain } from '@converters/url/link/plain'
import { convertUrlToLinkMarkdown } from '@converters/url/link/markdown'
import { convertUrlToLinkHTML } from '@converters/url/link/html'
import { convertUrlToLinkBBCode } from '@converters/url/link/bbcode'
import { convertUrlToFormattedURL } from '@converters/url/formatted'
import { convertMarkdownToBeautifyMarkdown } from '@converters/markdown/beautify'
import { convertHtmlToMarkdown } from '@converters/html/markdown'
import { convertHtmlToBeautifyHTML } from '@converters/html/html/beautify'
import { convertHtmlToSafeHTML } from '@converters/html/html/safe'
import { convertUrlToImageMarkdown } from '@converters/url/image/markdown'
import { convertUrlToImageDataURI } from '@converters/url/image/data-uri'
import { convertUrlToImageHTML } from '@converters/url/image/html'
import { convertUrlToImageBBCode } from '@converters/url/image/bbcode'
import { convertUrlToAudioHTML } from '@converters/url/audio/html'
import { convertUrlToVideoHTML } from '@converters/url/video/html'
import { convertHtmlToFormattedLinkHTML } from '@converters/html/html/formatted-link'
import { convertHtmlToOnlyATagHTML } from '@converters/html/html/only-a-tag'
import { convertHtmlToNoAttrHTML } from '@converters/html/html/no-attr'
import { convertTextToTrimmedText } from '@converters/text/trim'
import { convertTextToRawString } from '@converters/text/raw-string'
import { Awaitable } from '@blackglory/prelude'

export type ContextMenusClickHandler = (
  info: browser.Menus.OnClickData
, tab?: browser.Tabs.Tab
) => Awaitable<string | void>

export type CommandComplicateHandler = (
  info: Record<string, any>
, tab?: browser.Tabs.Tab
) => Awaitable<string | void>

interface Handlers {
  [menuItemId: string]: ContextMenusClickHandler | CommandComplicateHandler
}

export const handlers: Handlers = {
  ['TAB_URL_TO_PLAIN']: createCommandComplicateHandler((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkPlain(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_MARKDOWN']: createCommandComplicateHandler((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkMarkdown(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_HTML']: createCommandComplicateHandler((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkHTML(tab.url, tab.title)
    }
  })
, ['TAB_URL_TO_BBCODE']: createCommandComplicateHandler((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkBBCode(tab.url, tab.title)
    }
  })
, ['FRAME_URL_TO_PLAIN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await client.getDocumentTitle()
        return convertUrlToLinkPlain(url, title)
      } else {
        return convertUrlToLinkPlain(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await client.getDocumentTitle()
        return convertUrlToLinkMarkdown(url, title)
      } else {
        return convertUrlToLinkMarkdown(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await client.getDocumentTitle()
        return convertUrlToLinkHTML(url, title)
      } else {
        return convertUrlToLinkHTML(info.frameUrl)
      }
    }
  })
, ['FRAME_URL_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await client.getDocumentTitle()
        return convertUrlToLinkBBCode(url, title)
      } else {
        return convertUrlToLinkBBCode(info.frameUrl)
      }
    }
  })
, ['LINK_TO_MARKDOWN']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await client.getActiveElementContent()
        const title =
        convertMarkdownToBeautifyMarkdown(
          convertHtmlToMarkdown(
            convertHtmlToBeautifyHTML(
              convertHtmlToSafeHTML(html)
            )
          )
        )
        return convertUrlToLinkMarkdown(url, title || info.linkText)
      } else {
        return convertUrlToLinkMarkdown(info.linkUrl, info.linkText)
      }
    }
  })
, ['LINK_TO_HTML']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await client.getActiveElementContent()
        const title =
        convertHtmlToBeautifyHTML(
          convertHtmlToSafeHTML(html)
        )
        return convertUrlToLinkHTML(url, title || info.linkText)
      } else {
        return convertUrlToLinkHTML(info.linkUrl, info.linkText)
      }
    }
  })
, ['LINK_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await client.getActiveElementContent()
        const title =
        convertHtmlToBBCode(
          convertHtmlToBeautifyHTML(
            convertHtmlToSafeHTML(
              html
            )
          )
        )
        return convertUrlToLinkBBCode(url, title || info.linkText)
      } else {
        return convertUrlToLinkBBCode(info.linkUrl, info.linkText)
      }
    }
  })
, ['IMAGE_TO_MARKDOWN']: createContextMenusClickHandler((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageMarkdown(url)
      } else {
        return convertUrlToImageMarkdown(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  })
, ['IMAGE_TO_MARKDOWN_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  })
, ['IMAGE_TO_HTML']: createContextMenusClickHandler((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageHTML(url)
      } else {
        return convertUrlToImageHTML(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  })
, ['IMAGE_TO_HTML_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  })
, ['IMAGE_TO_BBCODE']: createContextMenusClickHandler(async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageBBCode(url)
      } else {
        return convertUrlToImageBBCode(info.srcUrl)
      }
    }
  })
, ['IMAGE_TO_DATA_URI_RAW']: createContextMenusClickHandler(async (
    { mediaType, srcUrl }
  , tab
  ) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl)
    }
  })
, ['IMAGE_TO_DATA_URI_JPEG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'jpeg')
    }
  })
, ['IMAGE_TO_DATA_URI_PNG']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'png')
    }
  })
, ['IMAGE_TO_DATA_URI_WEBP']: createContextMenusClickHandler(async ({
    mediaType
  , srcUrl
  }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'webp')
    }
  })
, ['AUDIO_TO_HTML']: createContextMenusClickHandler((info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToAudioHTML(url)
      } else {
        return convertUrlToAudioHTML(info.srcUrl)
      }
    }
  })
, ['VIDEO_TO_HTML']: createContextMenusClickHandler((info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToVideoHTML(url)
      } else {
        return convertUrlToVideoHTML(info.srcUrl)
      }
    }
  })
, ['SELECTION_TO_MARKDOWN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertMarkdownToBeautifyMarkdown(
          convertHtmlToMarkdown(
            convertHtmlToBeautifyHTML(
              convertHtmlToFormattedLinkHTML(
                convertHtmlToSafeHTML(html)
              , baseUrl
              )
            )
          )
        )
      )
    }
  })
, ['SELECTION_TO_HTML']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToFormattedLinkHTML(
            convertHtmlToSafeHTML(html)
          , baseUrl
          )
        )
      )
    }
  })
, ['SELECTION_TO_HTML_ONLY_A_TAG']: createCommandComplicateHandler(async (
    info
  , tab
  ) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToOnlyATagHTML(
            convertHtmlToFormattedLinkHTML(
              convertHtmlToSafeHTML(html)
            , baseUrl
            )
          )
        )
      )
    }
  })
, ['SELECTION_TO_HTML_NO_ATTR']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToNoAttrHTML(
            convertHtmlToSafeHTML(html)
          )
        )
      )
    }
  })
, ['SELECTION_TO_BBCODE']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBBCode(
          convertHtmlToBeautifyHTML(
            convertHtmlToFormattedLinkHTML(
              convertHtmlToSafeHTML(html)
            , baseUrl
            )
          )
        )
      )
    }
  })
, ['SELECTION_TO_PLAIN']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return await client.getSelectionText()
    }
  })
, ['SELECTION_TO_PLAIN_TRIMMED']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await client.getSelectionText()
      return convertTextToTrimmedText(text)
    }
  })
, ['SELECTION_TO_RAW_STRING']: createCommandComplicateHandler(async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await client.getSelectionText()
      return convertTextToRawString(text)
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
