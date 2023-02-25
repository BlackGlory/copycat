import browser from 'webextension-polyfill'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI, ImageFormat } from '@src/contract.js'
import { Awaitable } from '@blackglory/prelude'
import { pipeAsync } from 'extra-utils'
import { offscreen } from './offscreen-client.js'
import { formatURLsInHTML } from './format-links-in-html.js'
import { formatURL } from './format-url.js'
import { getConfig } from './storage.js'
import { createAsciiDocLink } from '@utils/create-ascii-doc-link.js'
import { createBBCodeImage } from '@utils/create-bbcode-image.js'
import { createBBCodeLink } from '@utils/create-bbcode-link.js'
import { createHTMLAudio } from '@utils/create-html-audio.js'
import { createHTMLImage } from '@utils/create-html-image.js'
import { createHTMLLink } from '@utils/create-html-link.js'
import { createHTMLVideo } from '@utils/create-html-video.js'
import { createMarkdownImage } from '@utils/create-markdown-image.js'
import { createMarkdownLink } from '@utils/create-markdown-link.js'
import { createOrgModeLink } from '@utils/create-org-mode-link.js'
import { createPlainTextLink } from '@utils/create-plain-text-link.js'
import { convertHTMLToBBCode } from '@utils/convert-html-to-bbcode.js'
import { formatHTML } from '@utils/format-html.js'
import { formatMarkdown } from '@utils/format-markdown.js'

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
  commandTabLinkAsPlainText(info, tab) {
    if (tab?.url) {
      return plainText(createPlainTextLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsRichText(info, tab) {
    if (tab?.url) {
      return richText(createHTMLLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsHTML(info, tab) {
    if (tab?.url) {
      return plainText(createHTMLLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsMarkdown(info, tab) {
    if (tab?.url) {
      return plainText(createMarkdownLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsOrgMode(info, tab) {
    if (tab?.url) {
      return plainText(createOrgModeLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsAsciiDoc(info, tab) {
    if (tab?.url) {
      return plainText(createAsciiDocLink(tab.url, tab.title))
    }
  }
, commandTabLinkAsBBCode(info, tab) {
    if (tab?.url) {
      return plainText(createBBCodeLink(tab.url, tab.title))
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

        return plainText(createPlainTextLink(url, title))
      } else {
        return plainText(createPlainTextLink(info.frameUrl))
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

        return richText(createHTMLLink(url, title))
      } else {
        return richText(createHTMLLink(info.frameUrl))
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

        return plainText(createHTMLLink(url, title))
      } else {
        return plainText(createHTMLLink(info.frameUrl))
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

        return plainText(createMarkdownLink(url, title))
      } else {
        return plainText(createMarkdownLink(info.frameUrl))
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

        return plainText(createOrgModeLink(url, title))
      } else {
        return plainText(createOrgModeLink(info.frameUrl))
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

        return plainText(createAsciiDocLink(url, title))
      } else {
        return plainText(createAsciiDocLink(info.frameUrl))
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

        return plainText(createBBCodeLink(url, title))
      } else {
        return plainText(createBBCodeLink(info.frameUrl))
      }
    }
  }
, commandLinkText(info, tab) {
    if (info.linkText) {
      return plainText(info.linkText)
    }
  }
, commandLinkAsPlainText(info, tab) {
    if (info.linkText && info.linkUrl) {
      return plainText(createPlainTextLink(info.linkUrl, info.linkText))
    }
  }
, async commandLinkAsRichText(info, tab) {
    if (info.linkText && info.linkUrl) {
      return richText(createHTMLLink(info.linkUrl, info.linkText))
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
        , offscreen.sanitizeHTML
        , formatHTML
        )

        return plainText(createHTMLLink(url, title))
      } else {
        return plainText(createHTMLLink(info.linkUrl, info.linkText))
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
        , offscreen.sanitizeHTML
        , formatHTML
        , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
        , formatMarkdown
        )

        return plainText(createMarkdownLink(url, text))
      } else {
        return plainText(createMarkdownLink(info.linkUrl, info.linkText))
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
        , offscreen.sanitizeHTML
        , formatHTML
        , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
        , formatMarkdown
        )

        return plainText(createOrgModeLink(url, title))
      } else {
        return plainText(createOrgModeLink(info.linkUrl, info.linkText))
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
        , offscreen.sanitizeHTML
        , formatHTML
        , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
        , formatMarkdown
        )

        return plainText(createAsciiDocLink(url, title))
      } else {
        return plainText(createAsciiDocLink(info.linkUrl, info.linkText))
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
        , offscreen.sanitizeHTML
        , formatHTML
        , convertHTMLToBBCode
        )

        return plainText(createBBCodeLink(url, title))
      } else {
        return plainText(createBBCodeLink(info.linkUrl, info.linkText))
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
      return plainText(JSON.stringify((text)))
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
          , offscreen.sanitizeHTML
          , html => formatURLsInHTML(html, baseURL)
          , formatHTML
          , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
          , formatMarkdown
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
          , offscreen.sanitizeHTML
          , html => formatURLsInHTML(html, baseURL)
          , formatHTML
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
        , offscreen.sanitizeHTML
        , offscreen.convertHTMLToNoAttrHTML
        , formatHTML
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
          , offscreen.sanitizeHTML
          , html => formatURLsInHTML(html, baseURL)
          , html => offscreen.convertHTMLToCleanHTML(html, config.html.cleanHTML)
          , formatHTML
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
          , offscreen.sanitizeHTML
          , html => formatURLsInHTML(html, baseURL)
          , formatHTML
          , convertHTMLToBBCode
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

        return plainText(createHTMLImage(url))
      } else {
        return plainText(createHTMLImage(info.srcUrl))
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

        return plainText(createMarkdownImage(url))
      } else {
        return plainText(createMarkdownImage(info.srcUrl))
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

        return plainText(createBBCodeImage(url))
      } else {
        return plainText(createBBCodeImage(info.srcUrl))
      }
    }
  }
, async commandImageAsDataURL({ mediaType, srcUrl }, tab) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(await offscreen.convertURLToImageDataURI(srcUrl))
    }
  }
, async commandImageAsDataURLJPEG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreen.convertURLToImageDataURI(srcUrl, ImageFormat.JPEG)
      )
    }
  }
, async commandImageAsDataURLPNG({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreen.convertURLToImageDataURI(srcUrl, ImageFormat.PNG)
      )
    }
  }
, async commandImageAsDataURLWebP({ mediaType, srcUrl }) {
    if (mediaType === 'image' && srcUrl) {
      return plainText(
        await offscreen.convertURLToImageDataURI(srcUrl, ImageFormat.WebP)
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

        return plainText(createHTMLAudio(url))
      } else {
        return plainText(createHTMLAudio(info.srcUrl))
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
        return plainText(createHTMLVideo(url))
      } else {
        return plainText(createHTMLVideo(info.srcUrl))
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
