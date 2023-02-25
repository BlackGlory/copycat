import { useState, useCallback } from 'react'
import { useMount } from 'extra-react-hooks'
import { IBackgroundAPI, IConfigStore, URLFormat, URLEncoding, MarkdownBullet, MarkdownBulletOrdered, MarkdownEmphasis, MarkdownFence, MarkdownListItemIndent, MarkdownThematicBreak, MarkdownStrong } from '@src/contract.js'
import * as DelightRPC from 'delight-rpc'
import { go, isFunction } from '@blackglory/prelude'
import { Updater } from 'use-immer'
import { produce } from 'immer'

export function useConfig(client: DelightRPC.ClientProxy<IBackgroundAPI>): [
  config: IConfigStore
, setConfig: Updater<IConfigStore>
] {
  const [config, setConfig] = useState<IConfigStore>({
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
      cleanHTML: {
        allowlist: []
      }
    }
  })

  useMount(() => {
    go(async () => {
      const config = await client.getConfig()
      if (config) {
        setConfig(config)
      }
    })
  })

  const updateConfig: Updater<IConfigStore> = useCallback((arg) => {
    go(async () => {
      if (isFunction(arg)) {
        const newConfig = produce(config, arg)
        setConfig(newConfig)
        await client.setConfig(newConfig)
      } else {
        const newConfig = arg
        setConfig(newConfig)
        await client.setConfig(newConfig)
      }
    })
  }, [config])

  return [
    config
  , updateConfig
  ]
}
