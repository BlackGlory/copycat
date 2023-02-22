import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI, ImageFormat } from '@src/contract.js'
import { Awaitable } from '@blackglory/prelude'
import { pipeAsync } from 'extra-utils'
import { offscreenClient } from './offscreen-client.js'
import { convertHTMLToMarkdown } from './convert-html-to-markdown.js'
import { formatURLsInHTML } from './format-links-in-html.js'
import { formatURL } from './format-url.js'

export interface IInfo {
  frameUrl?: string
  frameId?: number
  linkText?: string
  linkUrl?: string
  mediaType?: string
  srcUrl?: string
  pageUrl?: string
}

export type Handler = (
  info: IInfo
, tab?: browser.Tabs.Tab
) => Awaitable<Result | undefined>

export interface Result {
  type: ResultType
  content: string
}

export enum ResultType {
  PlainText
, RichText
}

function plainText(content: string): Result {
  return {
    type: ResultType.PlainText
  , content
  }
}

function richText(content: string): Result {
  return {
    type: ResultType.RichText
  , content
  }
}

interface IHandlers {
  [id: string]: Handler
}

export const handlers: IHandlers = {
  ['TAB_URL_TO_PLAIN']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkPlain(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_MARKDOWN']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkMarkdown(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_HTML']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_BBCODE']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkBBCode(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_ORG_MODE']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkOrgMode(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_ASCII_DOC']: async (info, tab) => {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkAsciiDoc(tab.url, tab.title)
      )
    }
  }
, ['TAB_URL_TO_RICH_TEXT']: async (info, tab) => {
    if (tab?.url) {
      return richText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, ['FRAME_URL_TO_PLAIN']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkPlain(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkPlain(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_MARKDOWN']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkMarkdown(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkMarkdown(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_HTML']: async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(info.frameUrl, tab.url)
        const title = await tabClient.getDocumentTitle()
        return plainText(await offscreenClient.convertURLToLinkHTML(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkHTML(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_BBCODE']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkBBCode(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkBBCode(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_ORG_MODE']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkOrgMode(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkOrgMode(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_ASCII_DOC']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkAsciiDoc(url, title))
      } else {
        return plainText(await offscreenClient.convertURLToLinkAsciiDoc(info.frameUrl))
      }
    }
  }
, ['FRAME_URL_TO_RICH_TEXT']: async (info, tab) => {
    if (info.frameUrl) {
      if (tab?.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const url = await formatURL(info.frameUrl, tab.url)
        const title = await tabClient.getDocumentTitle()
        return richText(await offscreenClient.convertURLToLinkHTML(url, title))
      } else {
        return richText(await offscreenClient.convertURLToLinkHTML(info.frameUrl))
      }
    }
  }
, ['LINK_TEXT']: async (info, tab) => {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
, ['LINK_TO_MARKDOWN']: async (info, tab) => {
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
        return plainText(
          await offscreenClient.convertURLToLinkMarkdown(url, title)
        )
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkMarkdown(info.linkUrl, info.linkText)
        )
      }
    }
  }
, ['LINK_TO_ORG_MODE']: async (info, tab) => {
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
        return plainText(
          await offscreenClient.convertURLToLinkOrgMode(url, title)
        )
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkOrgMode(info.linkUrl, info.linkText)
        )
      }
    }
  }
, ['LINK_TO_ASCII_DOC']: async (info, tab) => {
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
        return plainText(await offscreenClient.convertURLToLinkAsciiDoc(url, title))
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkAsciiDoc(
            info.linkUrl
          , info.linkText
          )
        )
      }
    }
  }
, ['LINK_TO_HTML']: async (info, tab) => {
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
        return plainText(
          await offscreenClient.convertURLToLinkHTML(url, title)
        )
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkHTML(info.linkUrl, info.linkText)
        )
      }
    }
  }
, ['LINK_TO_BBCODE']: async (info, tab) => {
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
        return plainText(
          await offscreenClient.convertURLToLinkBBCode(url, title)
        )
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkBBCode(info.linkUrl, info.linkText)
        )
      }
    }
  }
, ['IMAGE_TO_MARKDOWN']: async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return plainText(await offscreenClient.convertURLToImageMarkdown(url))
      } else {
        return plainText(await offscreenClient.convertURLToImageMarkdown(info.srcUrl))
      }
    }
  }
, ['IMAGE_TO_MARKDOWN_DATA_URI_JPEG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.JPEG)
        , offscreenClient.convertURLToImageMarkdown
        )
      )
    }
  }
, ['IMAGE_TO_MARKDOWN_DATA_URI_PNG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.PNG)
        , offscreenClient.convertURLToImageMarkdown
        )
      )
    }
  }
, ['IMAGE_TO_MARKDOWN_DATA_URI_WEBP']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.WebP)
        , offscreenClient.convertURLToImageMarkdown
        )
      )
    }
  }
, ['IMAGE_TO_HTML']: async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return plainText(await offscreenClient.convertURLToImageHTML(url))
      } else {
        return plainText(await offscreenClient.convertURLToImageHTML(info.srcUrl))
      }
    }
  }
, ['IMAGE_TO_HTML_DATA_URI_JPEG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.JPEG)
        , offscreenClient.convertURLToImageHTML
        )
      )
    }
  }
, ['IMAGE_TO_HTML_DATA_URI_PNG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.PNG)
        , offscreenClient.convertURLToImageHTML
        )
      )
    }
  }
, ['IMAGE_TO_HTML_DATA_URI_WEBP']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await pipeAsync(
          srcUrl
        , url => offscreenClient.convertURLToImageDataURI(url, ImageFormat.WebP)
        , offscreenClient.convertURLToImageHTML
        )
      )
    }
  }
, ['IMAGE_TO_BBCODE']: async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return plainText(await offscreenClient.convertURLToImageBBCode(url))
      } else {
        return plainText(await offscreenClient.convertURLToImageBBCode(info.srcUrl))
      }
    }
  }
, ['IMAGE_TO_DATA_URI_RAW']: async ({ mediaType, srcUrl }, tab) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(await offscreenClient.convertURLToImageDataURI(srcUrl))
    }
  }
, ['IMAGE_TO_DATA_URI_JPEG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.JPEG)
      )
    }
  }
, ['IMAGE_TO_DATA_URI_PNG']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.PNG)
      )
    }
  }
, ['IMAGE_TO_DATA_URI_WEBP']: async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.WebP)
      )
    }
  }
, ['AUDIO_TO_HTML']: async (info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return plainText(await offscreenClient.convertURLToAudioHTML(url))
      } else {
        return plainText(await offscreenClient.convertURLToAudioHTML(info.srcUrl))
      }
    }
  }
, ['VIDEO_TO_HTML']: async (info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab?.url) {
        const url = await formatURL(
          info.srcUrl
        , info.frameUrl ?? tab.url
        )
        return plainText(await offscreenClient.convertURLToVideoHTML(url))
      } else {
        return plainText(await offscreenClient.convertURLToVideoHTML(info.srcUrl))
      }
    }
  }
, ['SELECTION_TO_MARKDOWN']: async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSafeHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          , convertHTMLToMarkdown
          , offscreenClient.convertMarkdownToBeautifyMarkdown
          )
        )
      }
    }
  }
, ['SELECTION_TO_HTML']: async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSafeHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          )
        )
      }
    }
  }
, ['SELECTION_TO_HTML_ONLY_A_TAG']: async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSafeHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToOnlyATagHTML
          , offscreenClient.convertHTMLToBeautifyHTML
          )
        )
      }
    }
  }
, ['SELECTION_TO_HTML_NO_ATTR']: async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await tabClient.getSelectionHTML()
      return plainText(
        await pipeAsync(
          html
        , offscreenClient.convertHTMLToSafeHTML
        , offscreenClient.convertHTMLToNoAttrHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        )
      )
    }
  }
, ['SELECTION_TO_BBCODE']: async (info, tab) => {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSafeHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          , offscreenClient.convertHTMLToBBCode
          )
        )
      }
    }
  }
, ['SELECTION_TO_PLAIN']: async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return plainText(await tabClient.getSelectionText())
    }
  }
, ['SELECTION_TO_PLAIN_TRIMMED']: async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToTrimmedText(text))
    }
  }
, ['SELECTION_TO_RAW_STRING']: async (info, tab) => {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToRawString(text))
    }
  }
}
