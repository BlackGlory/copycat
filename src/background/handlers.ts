import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI, ImageFormat } from '@src/contract.js'
import { Awaitable } from '@blackglory/prelude'
import { pipeAsync } from 'extra-utils'
import { offscreenClient } from './offscreen-client.js'
import { formatURLsInHTML } from './format-links-in-html.js'
import { formatURL } from './format-url.js'
import { getConfig } from './storage.js'

export interface IInfo {
  pageUrl?: string
  frameUrl?: string
  frameId?: number
  linkText?: string
  linkUrl?: string
  mediaType?: string
  srcUrl?: string
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

interface IHandlers {
  [id: string]: Handler
}

export const handlers: IHandlers = {
  async TAB_URL_TO_PLAIN(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkPlain(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_MARKDOWN(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkMarkdown(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_HTML(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_BBCODE(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkBBCode(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_ORG_MODE(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkOrgMode(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_ASCII_DOC(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkAsciiDoc(tab.url, tab.title)
      )
    }
  }
, async TAB_URL_TO_RICH_TEXT(info, tab) {
    if (tab?.url) {
      return richText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, async FRAME_URL_TO_PLAIN(info, tab) {
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
, async FRAME_URL_TO_MARKDOWN(info, tab) {
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
, async FRAME_URL_TO_HTML(info, tab) {
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
, async FRAME_URL_TO_BBCODE(info, tab) {
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
, async FRAME_URL_TO_ORG_MODE(info, tab) {
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
, async FRAME_URL_TO_ASCII_DOC(info, tab) {
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
, async FRAME_URL_TO_RICH_TEXT(info, tab) {
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
, async LINK_TEXT(info, tab) {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
, async LINK_TO_MARKDOWN(info, tab) {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const config = await getConfig()
        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const text = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSanitizedHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , html => offscreenClient.convertHTMLToMarkdown(html, config.markdown)
        , offscreenClient.convertMarkdownToBeautifyMarkdown
        )
        return plainText(
          await offscreenClient.convertURLToLinkMarkdown(url, text)
        )
      } else {
        return plainText(
          await offscreenClient.convertURLToLinkMarkdown(info.linkUrl, info.linkText)
        )
      }
    }
  }
, async LINK_TO_ORG_MODE(info, tab) {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const config = await getConfig()
        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSanitizedHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , html => offscreenClient.convertHTMLToMarkdown(html, config.markdown)
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
, async LINK_TO_ASCII_DOC(info, tab) {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const tabClient = createTabClient<IFrameAPI>({
          tabId: tab.id
        , frameId: info.frameId
        })

        const config = await getConfig()
        const url = await formatURL(
          info.linkUrl
        , info.frameUrl ?? tab.url
        )
        const html = await tabClient.getActiveElementContent()
        const title = await pipeAsync(
          html
        , offscreenClient.convertHTMLToSanitizedHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        , html => offscreenClient.convertHTMLToMarkdown(html, config.markdown)
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
, async LINK_TO_HTML(info, tab) {
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
        , offscreenClient.convertHTMLToSanitizedHTML
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
, async LINK_TO_BBCODE(info, tab) {
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
        , offscreenClient.convertHTMLToSanitizedHTML
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
, async IMAGE_TO_MARKDOWN(info, tab) {
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
, async IMAGE_TO_MARKDOWN_DATA_URI_JPEG({ mediaType, srcUrl }) {
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
, async IMAGE_TO_MARKDOWN_DATA_URI_PNG({ mediaType, srcUrl }) {
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
, async IMAGE_TO_MARKDOWN_DATA_URI_WEBP({ mediaType, srcUrl }) {
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
, async IMAGE_TO_HTML(info, tab) {
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
, async IMAGE_TO_HTML_DATA_URI_JPEG({ mediaType, srcUrl }) {
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
, async IMAGE_TO_HTML_DATA_URI_PNG({ mediaType, srcUrl }) {
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
, async IMAGE_TO_HTML_DATA_URI_WEBP({ mediaType, srcUrl }) {
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
, async IMAGE_TO_BBCODE(info, tab) {
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
, async IMAGE_TO_DATA_URI_RAW({ mediaType, srcUrl }, tab) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(await offscreenClient.convertURLToImageDataURI(srcUrl))
    }
  }
, async IMAGE_TO_DATA_URI_JPEG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.JPEG)
      )
    }
  }
, async IMAGE_TO_DATA_URI_PNG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.PNG)
      )
    }
  }
, async IMAGE_TO_DATA_URI_WEBP({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.WebP)
      )
    }
  }
, async AUDIO_TO_HTML(info, tab) {
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
, async VIDEO_TO_HTML(info, tab) {
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
, async SELECTION_TO_MARKDOWN(info, tab) {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const config = await getConfig()
      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSanitizedHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          , html => offscreenClient.convertHTMLToMarkdown(html, config.markdown)
          , offscreenClient.convertMarkdownToBeautifyMarkdown
          )
        )
      }
    }
  }
, async SELECTION_TO_HTML(info, tab) {
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
          , offscreenClient.convertHTMLToSanitizedHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          )
        )
      }
    }
  }
, async SELECTION_TO_HTML_CLEAN(info, tab) {
    if (tab?.id) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })
      const config = await getConfig()

      const html = await client.getSelectionHTML()
      const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
      if (baseURL) {
        return plainText(
          await pipeAsync(
            html
          , offscreenClient.convertHTMLToSanitizedHTML
          , html => formatURLsInHTML(html, baseURL)
          , html => offscreenClient.convertHTMLToCleanHTML(html, config.html.cleaner)
          , offscreenClient.convertHTMLToBeautifyHTML
          )
        )
      }
    }
  }
, async SELECTION_TO_HTML_NO_ATTR(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await tabClient.getSelectionHTML()
      return plainText(
        await pipeAsync(
          html
        , offscreenClient.convertHTMLToSanitizedHTML
        , offscreenClient.convertHTMLToNoAttrHTML
        , offscreenClient.convertHTMLToBeautifyHTML
        )
      )
    }
  }
, async SELECTION_TO_BBCODE(info, tab) {
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
          , offscreenClient.convertHTMLToSanitizedHTML
          , html => formatURLsInHTML(html, baseURL)
          , offscreenClient.convertHTMLToBeautifyHTML
          , offscreenClient.convertHTMLToBBCode
          )
        )
      }
    }
  }
, async SELECTION_TO_PLAIN(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return plainText(await tabClient.getSelectionText())
    }
  }
, async SELECTION_TO_PLAIN_TRIMMED(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToTrimmedText(text))
    }
  }
, async SELECTION_TO_RAW_STRING(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToRawString(text))
    }
  }
, async SELECTION_TO_JSON_STRING(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToJSONString(text))
    }
  }
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
