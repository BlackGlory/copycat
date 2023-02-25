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
  async commandTabLinkAsPlainText(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkPlain(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsRichText(info, tab) {
    if (tab?.url) {
      return richText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsHTML(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkHTML(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsMarkdown(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkMarkdown(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsOrgMode(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkOrgMode(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsAsciiDoc(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkAsciiDoc(tab.url, tab.title)
      )
    }
  }
, async commandTabLinkAsBBCode(info, tab) {
    if (tab?.url) {
      return plainText(
        await offscreenClient.convertURLToLinkBBCode(tab.url, tab.title)
      )
    }
  }
, async commandFrameLinkAsPlainText(info, tab) {
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
, async commandFrameLinkAsRichText(info, tab) {
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
, async commandFrameLinkAsHTML(info, tab) {
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
, async commandFrameLinkAsMarkdown(info, tab) {
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
, async commandFrameLinkAsOrgMode(info, tab) {
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
, async commandFrameLinkAsAsciiDoc(info, tab) {
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
, async commandFrameLinkAsBBCode(info, tab) {
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
, async commandLinkText(info, tab) {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
, async commandLinkAsPlainText(info, tab) {
    if (info.linkText && info.linkUrl) {
      return plainText(
        await offscreenClient.convertURLToLinkPlain(
          info.linkUrl
        , info.linkText
        )
      )
    }
  }
, async commandLinkAsRichText(info, tab) {
    if (info.linkText && info.linkUrl) {
      return richText(
        await offscreenClient.convertURLToLinkHTML(info.linkUrl, info.linkText)
      )
    }
  }
, async commandLinkAsHTML(info, tab) {
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
, async commandLinkAsMarkdown(info, tab) {
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
, async commandLinkAsOrgMode(info, tab) {
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
, async commandLinkAsAsciiDoc(info, tab) {
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
, async commandLinkAsBBCode(info, tab) {
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
, async commandSelectionAsPlainText(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      return plainText(await tabClient.getSelectionText())
    }
  }
, async commandSelectionAsJSON(info, tab) {
    if (tab?.id) {
      const tabClient = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const text = await tabClient.getSelectionText()
      return plainText(await offscreenClient.convertTextToJSONString(text))
    }
  }
, async commandSelectionAsMarkdown(info, tab) {
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
, async commandSelectionAsHTML(info, tab) {
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
, async commandSelectionAsHTMLWithoutAttributes(info, tab) {
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
, async commandSelectionAsCleanHTML(info, tab) {
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
          , html => offscreenClient.convertHTMLToCleanHTML(html, config.html.cleanHTML)
          , offscreenClient.convertHTMLToBeautifyHTML
          )
        )
      }
    }
  }
, async commandSelectionAsBBCode(info, tab) {
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
, async commandImageAsHTML(info, tab) {
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
, async commandImageAsMarkdown(info, tab) {
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
, async commandImageAsBBCode(info, tab) {
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
, async commandImageAsDataURL({ mediaType, srcUrl }, tab) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(await offscreenClient.convertURLToImageDataURI(srcUrl))
    }
  }
, async commandImageAsDataURLJPEG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.JPEG)
      )
    }
  }
, async commandImageAsDataURLPNG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.PNG)
      )
    }
  }
, async commandImageAsDataURLWebP({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreenClient.convertURLToImageDataURI(srcUrl, ImageFormat.WebP)
      )
    }
  }
, async commandAudioAsHTML(info, tab) {
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
, async commandVideoAsHTML(info, tab) {
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
