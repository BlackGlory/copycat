import { IConfigStore, MarkdownFlavor } from '@src/contract.js'
import { i18n } from '@utils/i18n.js'
import { Select } from '@components/select.jsx'
import { Updater } from 'use-immer'

interface IMarkdownOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function MarkdownOptions({ config, setConfig }: IMarkdownOptionsProps) {
  return (
    <div>
      <section>
        <label>{i18n('Options_MarkdownFlavor')}</label>
        <Select
          value={config.markdown.flavor}
          items={[
            { name: i18n('Options_GitHubFlavoredMarkdown'), value: MarkdownFlavor.GitHubFlavoredMarkdown }
          , { name: i18n('Options_CommonMark'), value: MarkdownFlavor.CommonMark }
          ]}
          onChange={value => setConfig(config => {
            config.markdown.flavor = value
          })}
        />
      </section>
    </div>
  )
}
