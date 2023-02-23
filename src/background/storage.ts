import { LocalStorage } from 'extra-webextension'
import {
  StorageItemKey
, IStorage
, IConfigStore
, URLFormat
, URLEncoding
, MenuContext
, IMenuStore
, MarkdownBullet
, MarkdownBulletOrdered
, MarkdownEmphasis
, MarkdownFence
, MarkdownListItemIndent
, MarkdownRule
, MarkdownStrong
} from '@src/contract.js'

const storage = new LocalStorage<IStorage>()

export async function initStorage(): Promise<void> {
  await initConfig()
  await initMenu()
}

async function initConfig(): Promise<void> {
  const config: IConfigStore = {
    url: {
      encoding: URLEncoding.AlwaysEncode
    , format: URLFormat.Absolute
    }
  , markdown: {
      bullet: MarkdownBullet['*']
    , bulletOrdered: MarkdownBulletOrdered['.']
    , emphasis: MarkdownEmphasis['_']
    , fence: MarkdownFence['`']
    , listItemIndent: MarkdownListItemIndent.Space
    , rule: MarkdownRule['-']
    , strong: MarkdownStrong['*']
    }
  , html: {
      cleaner: {
        allowlist: []
      }
    }
  }

  await storage.setItem(StorageItemKey.Config, config)
}

async function initMenu(): Promise<void> {
  const menu: IMenuStore = {
    [MenuContext.Page]: [
      { id: 'TAB_URL_TO_PLAIN', visible: true }
    , { id: 'TAB_URL_TO_MARKDOWN', visible: true }
    , { id: 'TAB_URL_TO_BBCODE', visible: true }
    , { id: 'TAB_URL_TO_HTML', visible: true }
    , { id: 'TAB_URL_TO_ORG_MODE', visible: true }
    , { id: 'TAB_URL_TO_ASCII_DOC', visible: true }
    , { id: 'TAB_URL_TO_RICH_TEXT', visible: true }
    ]
  , [MenuContext.Frame]: [
      { id: 'FRAME_URL_TO_PLAIN', visible: true }
    , { id: 'FRAME_URL_TO_MARKDOWN', visible: true }
    , { id: 'FRAME_URL_TO_BBCODE', visible: true }
    , { id: 'FRAME_URL_TO_HTML', visible: true }
    , { id: 'FRAME_URL_TO_ORG_MODE', visible: true }
    , { id: 'FRAME_URL_TO_ASCII_DOC', visible: true }
    , { id: 'FRAME_URL_TO_RICH_TEXT', visible: true }
    ]
  , [MenuContext.Link]: [
      { id: 'LINK_TEXT', visible: true }
    , { id: 'LINK_TO_MARKDOWN', visible: true }
    , { id: 'LINK_TO_BBCODE', visible: true }
    , { id: 'LINK_TO_HTML', visible: true }
    , { id: 'LINK_TO_ORG_MODE', visible: true }
    , { id: 'LINK_TO_ASCII_DOC', visible: true }
    ]
  , [MenuContext.Selection]: [
      { id: 'SELECTION_TO_MARKDOWN', visible: true }
    , { id: 'SELECTION_TO_BBCODE', visible: true }
    , { id: 'SELECTION_TO_HTML', visible: true }
    , { id: 'SELECTION_TO_HTML_CLEAN', visible: true }
    , { id: 'SELECTION_TO_HTML_NO_ATTR', visible: true }
    , { id: 'SELECTION_TO_PLAIN', visible: true }
    , { id: 'SELECTION_TO_PLAIN_TRIMMED', visible: true }
    , { id: 'SELECTION_TO_RAW_STRING', visible: true }
    , { id: 'SELECTION_TO_JSON_STRING', visible: true }
    ]
  , [MenuContext.Image]: [
      { id: 'IMAGE_TO_MARKDOWN', visible: true }
    , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_JPEG', visible: true }
    , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_PNG', visible: true }
    , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_WEBP', visible: true }
    , { id: 'IMAGE_TO_BBCODE', visible: true }
    , { id: 'IMAGE_TO_HTML', visible: true }
    , { id: 'IMAGE_TO_HTML_DATA_URI_JPEG', visible: true }
    , { id: 'IMAGE_TO_HTML_DATA_URI_PNG', visible: true }
    , { id: 'IMAGE_TO_HTML_DATA_URI_WEBP', visible: true }
    , { id: 'IMAGE_TO_DATA_URI_RAW', visible: true }
    , { id: 'IMAGE_TO_DATA_URI_JPEG', visible: true }
    , { id: 'IMAGE_TO_DATA_URI_PNG', visible: true }
    , { id: 'IMAGE_TO_DATA_URI_WEBP', visible: true }
    ]
  , [MenuContext.Video]: [
      { id: 'AUDIO_TO_HTML', visible: true }
    ]
  , [MenuContext.Audio]: [
      { id: 'VIDEO_TO_HTML', visible: true }
    ]
  }

  await storage.setItem(StorageItemKey.Menu, menu)
}

export async function getConfig(): Promise<IConfigStore> {
  return await storage.getItem(StorageItemKey.Config)
}

export async function setConfig(config: IConfigStore): Promise<null> {
  await storage.setItem(StorageItemKey.Config, config)

  return null
}

export async function getMenu(): Promise<IMenuStore> {
  return await storage.getItem(StorageItemKey.Menu)
}

export async function setMenu(menu: IMenuStore): Promise<null> {
  await storage.setItem(StorageItemKey.Menu, menu)

  return null
}
