import { URLFormat, URLEncoding, IConfigStore } from '@src/contract.js'
import { i18n } from '@utils/i18n.js'
import { Select } from '@components/select.jsx'
import { Updater } from 'use-immer'

interface IURLOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function URLOptions({ config, setConfig }: IURLOptionsProps) {
  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>URL配置项</h3>
      <div className='px-4 py-2 space-y-2'>
        <Section>
          <label>{i18n('selectURLFormat')}</label>
          <Select
            value={config.url.format}
            items={[
              { name: i18n('selectAbsoluteURL'), value: URLFormat.Absolute }
            , { name: i18n('selectRelativeURL'), value: URLFormat.Relative }
            , { name: i18n('selectRootRelativeURL'), value: URLFormat.RootRelative }
            , { name: i18n('selectOriginalURL'), value: URLFormat.Original }
            ]}
            onChange={value => setConfig(config => {
              config.url.format = value
            })}
          />
        </Section>

        <Section>
          <label>URL Encoding</label>
          <Select
            value={config.url.encoding}
            items={[
              { name: 'Original', value: URLEncoding.Original }
            , { name: 'Always Encode', value: URLEncoding.AlwaysEncode }
            , { name: 'Always Decode', value: URLEncoding.AlwaysDecode }
            ]}
            onChange={value => setConfig(config => {
              config.url.encoding = value
            })}
          />
        </Section>
      </div>
    </div>
  )
}

function Section(props: React.InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <section {...props} />
  )
}
