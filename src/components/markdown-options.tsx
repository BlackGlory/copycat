import { IConfigStore } from '@src/contract.js'
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
    </div>
  )
}
