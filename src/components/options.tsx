import { useMemo } from 'react'
import { useMount } from 'extra-react-hooks'
import { useImmer } from 'use-immer'
import { IBackgroundAPI, IConfigStorage, URLFormat, MarkdownFlavor, URLEncoding } from '@src/contract.js'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { i18n } from '@utils/i18n.js'
import { go } from '@blackglory/prelude'
import { Select } from '@components/select.jsx'

export function Options() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [config, setConfig] = useImmer<IConfigStorage>({
    markdownFlavor: MarkdownFlavor.GFM
  , urlFormat: URLFormat.Absolute
  , urlEncoding: URLEncoding.AlwaysEncode
  })

  useMount(() => {
    go(async () => {
      const config = await client.getConfig()
      setConfig(config)
    })
  })

  return (
    <div className='min-w-[600px]'>
      <section>
        <label>{i18n('Options_UrlFormat')}</label>

        <Select
          value={config.urlFormat}
          items={[
            { name: i18n('Options_AbsoluteURL'), value: URLFormat.Absolute }
          , { name: i18n('Options_RelativeURL'), value: URLFormat.Relative }
          , { name: i18n('Options_RootRelativeURL'), value: URLFormat.RootRelative }
          , { name: i18n('Options_OriginalURL'), value: URLFormat.Original }
          ]}
          onChange={value => setConfig(config => {
            config.urlFormat = value
          })}
        />
      </section>

      <section>
        <label>URL Encoding</label>
        <Select
          value={config.urlEncoding}
          items={[
            { name: 'Original', value: URLEncoding.Original }
          , { name: 'Always Encode', value: URLEncoding.AlwaysEncode }
          , { name: 'Always Decode', value: URLEncoding.AlwaysDecode }
          ]}
          onChange={value => setConfig(config => {
            config.urlEncoding = value
          })}
        />
      </section>

      <section>
        <label>{i18n('Options_MarkdownFlavor')}</label>
        <Select
          value={config.markdownFlavor}
          items={[
            { name: i18n('Options_GitHubFlavoredMarkdown'), value: MarkdownFlavor.GFM }
          , { name: i18n('Options_CommonMark'), value: MarkdownFlavor.Commonmark }
          , { name: i18n('Options_Ghost'), value: MarkdownFlavor.Ghost }
          ]}
          onChange={value => setConfig(config => {
            config.markdownFlavor = value
          })}
        />
      </section>

    </div>
  )
}
