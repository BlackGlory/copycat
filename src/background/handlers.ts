import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { ITabAPI } from '@src/contract'
import {
  TAB_URL_TO_PLAIN
, TAB_URL_TO_MARKDOWN
, TAB_URL_TO_HTML
, TAB_URL_TO_BBCODE
, FRAME_URL_TO_PLAIN
, FRAME_URL_TO_MARKDOWN
, FRAME_URL_TO_HTML
, FRAME_URL_TO_BBCODE
, LINK_TO_MARKDOWN
, LINK_TO_HTML
, LINK_TO_BBCODE
, SELECTION_TO_MARKDOWN
, SELECTION_TO_HTML
, SELECTION_TO_HTML_ONLY_A_TAG
, SELECTION_TO_HTML_NO_ATTR
, SELECTION_TO_BBCODE
, SELECTION_TO_PLAIN
, SELECTION_TO_PLAIN_TRIMMED
, SELECTION_TO_RAW_STRING
, IMAGE_TO_MARKDOWN
, IMAGE_TO_MARKDOWN_DATA_URI_JPEG
, IMAGE_TO_MARKDOWN_DATA_URI_PNG
, IMAGE_TO_MARKDOWN_DATA_URI_WEBP
, IMAGE_TO_HTML
, IMAGE_TO_HTML_DATA_URI_JPEG
, IMAGE_TO_HTML_DATA_URI_PNG
, IMAGE_TO_HTML_DATA_URI_WEBP
, IMAGE_TO_BBCODE
, IMAGE_TO_DATA_URI_RAW
, IMAGE_TO_DATA_URI_JPEG
, IMAGE_TO_DATA_URI_PNG
, IMAGE_TO_DATA_URI_WEBP
, AUDIO_TO_HTML
, VIDEO_TO_HTML
} from './symbols'
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

interface UniversalHandlers {
  [menuItemId: string]: ContextMenusClickHandler | CommandComplicateHandler
}

export const handlers: UniversalHandlers = {
  [TAB_URL_TO_PLAIN]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkPlain(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_MARKDOWN]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkMarkdown(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_HTML]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkHTML(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_BBCODE]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkBBCode(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [FRAME_URL_TO_PLAIN]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_MARKDOWN]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_HTML]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_BBCODE]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [LINK_TO_MARKDOWN]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [LINK_TO_HTML]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [LINK_TO_BBCODE]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const client = createTabClient<ITabAPI>({
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
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN]: ((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageMarkdown(url)
      } else {
        return convertUrlToImageMarkdown(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageHTML(url)
      } else {
        return convertUrlToImageHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_BBCODE]: (async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageBBCode(url)
      } else {
        return convertUrlToImageBBCode(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_RAW]: (async ({ mediaType, srcUrl }, tab) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl)
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'jpeg')
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'png')
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'webp')
    }
  }) as ContextMenusClickHandler
, [AUDIO_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToAudioHTML(url)
      } else {
        return convertUrlToAudioHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [VIDEO_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToVideoHTML(url)
      } else {
        return convertUrlToVideoHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [SELECTION_TO_MARKDOWN]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
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
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
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
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML_ONLY_A_TAG]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
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
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML_NO_ATTR]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
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
  }) as CommandComplicateHandler
, [SELECTION_TO_BBCODE]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
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
  }) as CommandComplicateHandler
, [SELECTION_TO_PLAIN]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return await client.getSelectionText()
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_PLAIN_TRIMMED]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await client.getSelectionText()
      return convertTextToTrimmedText(text)
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_RAW_STRING]: (async (info, tab) => {
    if (tab && tab.id) {
      const client = createTabClient<ITabAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await client.getSelectionText()
      return convertTextToRawString(text)
    }
  }) as CommandComplicateHandler
}
