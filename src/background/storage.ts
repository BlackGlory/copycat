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
, MarkdownThematicBreak
, MarkdownStrong
} from '@src/contract.js'
import { updateMenu } from './menu.js'

const storage = new LocalStorage<IStorage>()

export async function initStorage(): Promise<void> {
  await initConfig()
  await initMenu()
}

async function initConfig(): Promise<void> {
  const config: IConfigStore = {
    url: {
      encoding: URLEncoding.Original
    , format: URLFormat.Original
    }
  , markdown: {
      emphasis: MarkdownEmphasis['_']
    , strong: MarkdownStrong['*']
    , bulletUnordered: MarkdownBullet['*']
    , bulletOrdered: MarkdownBulletOrdered['.']
    , listItemIndent: MarkdownListItemIndent.Space
    , thematicBreak: MarkdownThematicBreak['-']
    , fence: MarkdownFence['`']
    }
  , html: {
      cleanHTML: {
        allowlist: []
      }
    }
  }

  await storage.setItem(StorageItemKey.Config, config)
}

async function initMenu(): Promise<void> {
  const menu: IMenuStore = [
    {
      context: MenuContext.Page
    , items: [
        { id: 'commandTabLinkAsPlainText', visible: true }
      , { id: 'commandTabLinkAsRichText', visible: true }
      , { id: 'commandTabLinkAsHTML', visible: true }
      , { id: 'commandTabLinkAsMarkdown', visible: true }
      , { id: 'commandTabLinkAsOrgMode', visible: true }
      , { id: 'commandTabLinkAsAsciiDoc', visible: true }
      , { id: 'commandTabLinkAsBBCode', visible: true }
      ]
    }
  , {
      context: MenuContext.Frame
    , items: [
        { id: 'commandFrameLinkAsPlainText', visible: true }
      , { id: 'commandFrameLinkAsRichText', visible: true }
      , { id: 'commandFrameLinkAsHTML', visible: true }
      , { id: 'commandFrameLinkAsMarkdown', visible: true }
      , { id: 'commandFrameLinkAsOrgMode', visible: true }
      , { id: 'commandFrameLinkAsAsciiDoc', visible: true }
      , { id: 'commandFrameLinkAsBBCode', visible: true }
      ]
    }
  , {
      context: MenuContext.Link
    , items: [
        { id: 'commandLinkText', visible: true }
      , { id: 'commandLinkAsPlainText', visible: true }
      , { id: 'commandLinkAsRichText', visible: true }
      , { id: 'commandLinkAsHTML', visible: true }
      , { id: 'commandLinkAsMarkdown', visible: true }
      , { id: 'commandLinkAsOrgMode', visible: true }
      , { id: 'commandLinkAsAsciiDoc', visible: true }
      , { id: 'commandLinkAsBBCode', visible: true }
      ]
    }
  , {
      context: MenuContext.Selection
    , items: [
        { id: 'commandSelectionAsPlainText', visible: true }
      , { id: 'commandSelectionAsJSON', visible: true }
      , { id: 'commandSelectionAsMarkdown', visible: true }
      , { id: 'commandSelectionAsHTML', visible: true }
      , { id: 'commandSelectionAsHTMLWithoutAttributes', visible: true }
      , { id: 'commandSelectionAsCleanHTML', visible: true }
      , { id: 'commandSelectionAsBBCode', visible: true }
      ]
    }
  , {
      context: MenuContext.Image
    , items: [
        { id: 'commandImageAsHTML', visible: true }
      , { id: 'commandImageAsMarkdown', visible: true }
      , { id: 'commandImageAsBBCode', visible: true }
      , { id: 'commandImageAsDataURL', visible: true }
      ]
    }
  , {
      context: MenuContext.Video
    , items: [
        { id: 'commandAudioAsHTML', visible: true }
      ]
    }
  , {
      context: MenuContext.Audio
    , items: [
        { id: 'commandVideoAsHTML', visible: true }
      ]
    }
  ]

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

  await updateMenu()

  return null
}
