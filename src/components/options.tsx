import React from 'react'
import browser from 'webextension-polyfill'
import styled from 'styled-components'
import produce from 'immer'
import { loadConfigure, saveConfigure, Config } from '@src/configure'

interface OptionsState {
  selector: Config
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

export class Options extends React.Component<Record<string, never>, OptionsState> {
  state: OptionsState = {
    selector: loadConfigure()
  }

  componentDidMount() {
    this.setState(produce<OptionsState>(draft => {
      draft.selector = loadConfigure()
    }))
  }

  selectChangeHandler = (field: keyof Config) => (e: any) => {
    const selected = e.target.value
    this.setState(produce<OptionsState>(draft => {
      // @ts-ignore
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
                <option value='absolute'>{ browser.i18n.getMessage('Options_AbsoluteURL') }</option>
                <option value='relative'>{ browser.i18n.getMessage('Options_RelativeURL') }</option>
                <option value='root-relative'>{ browser.i18n.getMessage('Options_RootRelativeURL') }</option>
                <option value='original'>{ browser.i18n.getMessage('Options_OriginalURL') }</option>
              </Select>
            </td>
          </tr>
          <tr>
            <td><Label>{ browser.i18n.getMessage('Options_MarkdownFlavor') }</Label></td>
            <td>
              <Select value={ selector.markdownFlavor } onChange={ this.selectChangeHandler('markdownFlavor') }>
                <option value='gfm'>{ browser.i18n.getMessage('Options_GitHubFlavoredMarkdown') }</option>
                <option value='commonmark'>{ browser.i18n.getMessage('Options_CommonMark') }</option>
                <option value='ghost'>{ browser.i18n.getMessage('Options_Ghost') }</option>
              </Select>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
