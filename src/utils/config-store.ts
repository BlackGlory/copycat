import { IBackgroundAPI, IConfigStore, URLFormat, URLEncoding, MarkdownBullet, MarkdownBulletOrdered, MarkdownEmphasis, MarkdownFence, MarkdownListItemIndent, MarkdownThematicBreak, MarkdownStrong } from '@src/contract.js'
import { go } from '@blackglory/prelude'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { Store, createStoreContext } from 'extra-react-store'

export class ConfigStore extends Store<IConfigStore> {
  private client = createBackgroundClient<IBackgroundAPI>()

  constructor() {
    super({
      url: {
        format: URLFormat.Absolute
      , encoding: URLEncoding.Encode
      }
    , markdown: {
        bulletUnordered: MarkdownBullet['*']
      , bulletOrdered: MarkdownBulletOrdered['.']
      , emphasis: MarkdownEmphasis['_']
      , fence: MarkdownFence['`']
      , listItemIndent: MarkdownListItemIndent.Space
      , thematicBreak: MarkdownThematicBreak['-']
      , strong: MarkdownStrong['*']
      }
    , html: {
        formatHTML: true
      , cleanHTML: {
          allowlist: []
        }
      }
    })

    go(async () => {
      const config = await this.client.getConfig()
      super.setState(config)
    })
  }

  override setState(state: IConfigStore): void {
    super.setState(state)
    this.client.setConfig(state)
  }
}

export const ConfigStoreContext = createStoreContext<IConfigStore>()
