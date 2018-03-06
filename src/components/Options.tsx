import * as React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { loadConfigure, saveConfigure, UrlFormat, MarkdownFlavor, IConfig } from '../utils'

interface IOptionsState {
  selector: IConfig
}

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

export default class Options extends React.Component<{}, IOptionsState> {
  state: IOptionsState = {
    selector: loadConfigure()
  }

  componentDidMount() {
    this.setState(produce((draft: IOptionsState) => {
      draft.selector = loadConfigure()
    }))
  }

  selectChangeHandler = (field: keyof IConfig) => (e: any) => {
    const selected = e.target.value
    this.setState(produce((draft: IOptionsState) => {
      draft.selector[field] = selected
    }), () => saveConfigure(this.state.selector))
  }

  render() {
    const { selector } = this.state

    return (
      <Table>
        <tbody>
          <tr>
            <td><Label>{ browser.i18n.getMessage('Options_UrlFormat') }</Label></td>
            <td>
              <Select value={ selector.urlFormat } onChange={ this.selectChangeHandler('urlFormat') }>
                <option value="absolute">{ browser.i18n.getMessage('Options_AbsoluteURL') }</option>
                <option value="original">{ browser.i18n.getMessage('Options_OriginalURL') }</option>
              </Select>
            </td>
          </tr>
          <tr>
            <td><Label>{ browser.i18n.getMessage("Options_MarkdownFlavor") }</Label></td>
            <td>
              <Select value={ selector.markdownFlavor } onChange={ this.selectChangeHandler('markdownFlavor') }>
                <option value="gfm">{ browser.i18n.getMessage('Options_GitHubFlavoredMarkdown') }</option>
                <option value="commonmark">{ browser.i18n.getMessage('Options_CommonMark') }</option>
                <option value="ghost">{ browser.i18n.getMessage('Options_Ghost') }</option>
              </Select>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
