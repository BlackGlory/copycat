import styled from 'styled-components'
import { useImmer } from 'use-immer'
import { loadConfigure, saveConfigure, Config, URLFormat, MarkdownFlavor } from '@src/config'
import { i18n } from '@utils/i18n'

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
  const [selector, setSelector] = useImmer<Config>(loadConfigure())

  return (
    <Window>
      <Table>
        <tbody>
          <tr>
            <td><Label>{i18n('Options_UrlFormat')}</Label></td>
            <td>
              <Select value={selector.urlFormat} onChange={e => {
                setSelector(selector => {
                  selector.urlFormat = e.target.value as URLFormat
                  saveConfigure(selector)
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
              <Select value={selector.markdownFlavor} onChange={e => {
                setSelector(selector => {
                  selector.markdownFlavor = e.target.value as MarkdownFlavor
                  saveConfigure(selector)
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
