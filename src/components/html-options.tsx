import { IConfigStore } from '@src/contract.js'
import { Updater } from 'use-immer'
import { TextInput } from '@components/text-input.jsx'
import { Button } from '@components/button.jsx'
import { RemoveButton } from '@components/remove-button.jsx'
import { i18n } from '@utils/i18n.js'

interface IHTMLOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function HTMLOptions({ config, setConfig }: IHTMLOptionsProps) {
  const allowlist = config.html.cleanHTML.allowlist

  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>{i18n('headingHTMLConfig')}</h3>
      <div className='py-2'>
        <h4 className='px-4 text-sm'>{i18n('headingCleanHTMLAllowlist')}</h4>

        <nav className='px-4'>
          <Button
            className='w-full'
            onClick={() => setConfig(config => {
              config.html.cleanHTML.allowlist.push({
                elements: ''
              , attributes: ''
              })
            })}
          >
            {i18n('buttonCreateItem')}
          </Button>
        </nav>

        <ul className='mt-1'>
          {allowlist.map((item, i) => (
            <li
              key={i}
              className='py-2.5 px-4 flex justify-between hover:bg-gray-300'
            >
              <div>
                <section>
                  <label>
                    <span>{i18n('labelElements')}</span>
                    <TextInput
                      value={item.elements}
                      onChange={e => setConfig(config => {
                        config.html.cleanHTML.allowlist[i].elements = e.target.value
                      })}
                    />
                  </label>
                </section>

                <section>
                  <label>
                    <span>{i18n('labelAttributes')}</span>
                    <TextInput
                      value={item.attributes}
                      onChange={e => setConfig(config => {
                        config.html.cleanHTML.allowlist[i].attributes = e.target.value
                      })}
                    />
                  </label>
                </section>
              </div>

              <aside>
                <RemoveButton
                  onClick={() => setConfig(config => {
                    config.html.cleanHTML.allowlist.splice(i, 1)
                  })}
                />
              </aside>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
