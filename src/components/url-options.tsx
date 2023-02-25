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
      <h3 className='text-base px-4 py-2'>{i18n('headingURLConfig')}</h3>
      <div className='px-4 py-2 space-y-2'>
        <Section>
          <label>{i18n('labelURLFormat')}</label>
          <Select
            value={config.url.format}
            items={[
              { name: i18n('selectOriginalURL'), value: URLFormat.Original }
            , { name: i18n('selectAbsoluteURL'), value: URLFormat.Absolute }
            , { name: i18n('selectRelativeURL'), value: URLFormat.Relative }
            , { name: i18n('selectRootRelativeURL'), value: URLFormat.RootRelative }
            ]}
            onChange={value => setConfig(config => {
              config.url.format = value
            })}
          />
        </Section>

        <Section>
          <label>{i18n('labelURLEncoding')}</label>
          <Select
            value={config.url.encoding}
            items={[
              { name: i18n('selectOriginalURL'), value: URLEncoding.Original }
            , { name: i18n('selectEncodeURL'), value: URLEncoding.Encode }
            , { name: i18n('selectDecodeURL'), value: URLEncoding.Decode }
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
