import { useMemo } from 'react'
import { useMount } from 'extra-react-hooks'
import styled from 'styled-components'
import { useImmer } from 'use-immer'
import { IBackgroundAPI, IConfigStorage, URLFormat, MarkdownFlavor } from '@src/contract'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { i18n } from '@utils/i18n'
import { go } from '@blackglory/prelude'

const Window = styled.div`
  min-width: 600px;
`

const Table = styled.table`
  width: 100%;
`

const Label = styled.label`
  &:after {
    content: ": ";
  }
`

const Select = styled.select`
  width: 100%;
`

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
    <Window>
      <Table>
        <tbody>
          <tr>
            <td><Label>{i18n('Options_UrlFormat')}</Label></td>
            <td>
              <Select value={config.urlFormat} onChange={e => {
                setConfig(config => {
                  config.urlFormat = e.target.value as URLFormat
                  setConfig(config)
                })
              }}>
                <option value='absolute'>{i18n('Options_AbsoluteURL')}</option>
                <option value='relative'>{i18n('Options_RelativeURL')}</option>
                <option value='root-relative'>{i18n('Options_RootRelativeURL')}</option>
                <option value='original'>{i18n('Options_OriginalURL')}</option>
              </Select>
            </td>
          </tr>
          <tr>
            <td><Label>{i18n('Options_MarkdownFlavor')}</Label></td>
            <td>
              <Select value={config.markdownFlavor} onChange={e => {
                setConfig(selector => {
                  selector.markdownFlavor = e.target.value as MarkdownFlavor
                  setConfig(selector)
                })
              }}>
                <option value='gfm'>{i18n('Options_GitHubFlavoredMarkdown')}</option>
                <option value='commonmark'>{i18n('Options_CommonMark')}</option>
                <option value='ghost'>{i18n('Options_Ghost')}</option>
              </Select>
            </td>
          </tr>
        </tbody>
      </Table>
    </Window>
  )
}
