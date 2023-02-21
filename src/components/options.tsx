import { useMemo } from 'react'
import { useMount } from 'extra-react-hooks'
import { useImmer } from 'use-immer'
import { IBackgroundAPI, IConfigStorage, URLFormat, MarkdownFlavor } from '@src/contract.js'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { i18n } from '@utils/i18n.js'
import { go } from '@blackglory/prelude'

export function Options() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [config, setConfig] = useImmer<IConfigStorage>({
    markdownFlavor: MarkdownFlavor.GFM
  , urlFormat: URLFormat.Absolute
  })

  useMount(() => {
    go(async () => {
      const config = await client.getConfig()
      setConfig(config)
    })
  })

  return (
    <div className='min-w-[600px]'>
      <table className='w-full'>
        <tbody>
          <tr>
            <td>
              <label>{i18n('Options_UrlFormat')}</label>
            </td>
            <td>
              <select
                className='w-full'
                value={config.urlFormat}
                onChange={e => {
                  setConfig(config => {
                    config.urlFormat = e.target.value as URLFormat
                    setConfig(config)
                  })
                }}
              >
                <option value='absolute'>{i18n('Options_AbsoluteURL')}</option>
                <option value='relative'>{i18n('Options_RelativeURL')}</option>
                <option value='root-relative'>{i18n('Options_RootRelativeURL')}</option>
                <option value='original'>{i18n('Options_OriginalURL')}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>{i18n('Options_MarkdownFlavor')}</label>
            </td>
            <td>
              <select
                className='w-full'
                value={config.markdownFlavor}
                onChange={e => {
                  setConfig(selector => {
                    selector.markdownFlavor = e.target.value as MarkdownFlavor
                    setConfig(selector)
                  })
                }}
              >
                <option value='gfm'>{i18n('Options_GitHubFlavoredMarkdown')}</option>
                <option value='commonmark'>{i18n('Options_CommonMark')}</option>
                <option value='ghost'>{i18n('Options_Ghost')}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
