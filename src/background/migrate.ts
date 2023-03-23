import { pipeAsync } from 'extra-utils'
import { createMigration } from 'extra-semver'
import { LocalStorage } from 'extra-webextension'
import { produce } from 'immer'

export async function migrate(previousVersion: string): Promise<void> {
  await pipeAsync(
    previousVersion
  , createMigration('^2.0.0', '3.0.0', async () => {
      enum StorageItemKey {
        Menu = 'menu'
      , Config = 'config'
      }

      interface IMenuItem {
        id: string
        visible: boolean
      }

      enum MenuContext {
        Page = 'page'
      , Frame = 'frame'
      , Link = 'link'
      , Selection = 'selection'
      , Image = 'image'
      , Audio = 'audio'
      , Video = 'video'
      }

      type IMenuStore = Array<{
        context: MenuContext
      , items: IMenuItem[]
      }>

      interface IStorage {
        [StorageItemKey.Menu]: IMenuStore
        [StorageItemKey.Config]: IConfigStore
      }

      interface IConfigStore {
        url: IURLConfig
        html: IHTMLConfig
        markdown: IMarkdownConfig
      }

      interface IURLConfig {
        format: URLFormat
        encoding: URLEncoding
      }

      interface IMarkdownConfig {
        emphasis: MarkdownEmphasis
        strong: MarkdownStrong
        bulletUnordered: MarkdownBullet
        bulletOrdered: MarkdownBulletOrdered
        listItemIndent: MarkdownListItemIndent
        thematicBreak: MarkdownThematicBreak
        fence: MarkdownFence
      }

      enum MarkdownBullet {
        '-'
      , '*'
      , '+'
      }

      enum MarkdownBulletOrdered {
        '.'
      , ')'
      }

      enum MarkdownEmphasis {
        '*'
      , '_'
      }

      enum MarkdownFence {
        '`'
      , '~'
      }

      enum MarkdownListItemIndent {
        Space
      , Tab
      }

      enum MarkdownThematicBreak {
        '*'
      , '-'
      , '_'
      }

      enum MarkdownStrong {
        '*'
      , '_'
      }

      interface IHTMLConfig {
        cleanHTML: IHTMLCleanHTMLConfig
      }

      interface IHTMLCleanHTMLConfig {
        allowlist: IHTMLCleanerAllowlistItem[]
      }

      interface IHTMLCleanerAllowlistItem {
        elements: string
        attributes: string
      }

      enum URLFormat {
        Original
      , Absolute
      , Relative
      , RootRelative
      }

      enum URLEncoding {
        Original
      , Encode
      , Decode
      }

      const storage = new LocalStorage<IStorage>()

      await initConfig()
      await initMenu()

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
              allowlist: [
                { elements: 'a', attributes: 'href' }
              , { elements: 'img', attributes: 'src' }
              ]
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
            , { id: 'commandSelectionAsConcatenatedPlainText', visible: true }
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
            context: MenuContext.Audio
          , items: [
              { id: 'commandAudioAsHTML', visible: true }
            ]
          }
        , {
            context: MenuContext.Video
          , items: [
              { id: 'commandVideoAsHTML', visible: true }
            ]
          }
        ]

        await storage.setItem(StorageItemKey.Menu, menu)
      }
    })
  , createMigration('>=3.0.0 <=3.0.1', '3.0.2', async () => {
      enum StorageItemKey {
        Menu = 'menu'
      , Config = 'config'
      }

      interface IStorage {
        [StorageItemKey.Menu]: IMenuStore
        [StorageItemKey.Config]: IConfigStore
      }

      type IMenuStore = Array<{
        context: MenuContext
      , items: IMenuItem[]
      }>

      interface IMenuItem {
        id: string
        visible: boolean
      }

      enum MenuContext {
        Page = 'page'
      , Frame = 'frame'
      , Link = 'link'
      , Selection = 'selection'
      , Image = 'image'
      , Audio = 'audio'
      , Video = 'video'
      }

      interface IConfigStore {
        url: IURLConfig
        html: IHTMLConfig
        markdown: IMarkdownConfig
      }

      interface IURLConfig {
        format: URLFormat
        encoding: URLEncoding
      }

      enum URLFormat {
        Original
      , Absolute
      , Relative
      , RootRelative
      }

      enum URLEncoding {
        Original
      , Encode
      , Decode
      }

      interface IMarkdownConfig {
        emphasis: MarkdownEmphasis
        strong: MarkdownStrong
        bulletUnordered: MarkdownBullet
        bulletOrdered: MarkdownBulletOrdered
        listItemIndent: MarkdownListItemIndent
        thematicBreak: MarkdownThematicBreak
        fence: MarkdownFence
      }

      enum MarkdownBullet {
        '-'
      , '*'
      , '+'
      }

      enum MarkdownBulletOrdered {
        '.'
      , ')'
      }

      enum MarkdownEmphasis {
        '*'
      , '_'
      }

      enum MarkdownFence {
        '`'
      , '~'
      }

      enum MarkdownListItemIndent {
        Space
      , Tab
      }

      enum MarkdownThematicBreak {
        '*'
      , '-'
      , '_'
      }

      enum MarkdownStrong {
        '*'
      , '_'
      }

      interface IHTMLConfig {
        formatHTML: boolean
        cleanHTML: IHTMLCleanHTMLConfig
      }

      interface IHTMLCleanHTMLConfig {
        allowlist: IHTMLCleanerAllowlistItem[]
      }

      interface IHTMLCleanerAllowlistItem {
        elements: string
        attributes: string
      }

      const storage = new LocalStorage<IStorage>()
      const oldConfig = await storage.getItem(StorageItemKey.Config)
      const newConfig = produce(oldConfig, config => {
        config.html.formatHTML = true
      })
      await storage.setItem(StorageItemKey.Config, newConfig)
    })
  )
}
