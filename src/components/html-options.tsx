import { TextInput } from '@components/text-input.jsx'
import { Button } from '@components/button.jsx'
import { RemoveButton } from '@components/remove-button.jsx'
import { Checkbox } from '@components/checkbox.jsx'
import { i18n } from '@utils/i18n.js'
import { ConfigStoreContext } from '@utils/config-store.js'
import { useSelector, useUpdater } from 'extra-react-store'

export function HTMLOptions() {
  const html = useSelector(ConfigStoreContext, config => config.html)
  const updateConfig = useUpdater(ConfigStoreContext)

  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>{i18n('headingHTMLConfig')}</h3>
      <div className='py-2 space-y-2'>
        <div className='px-4'>
          <Checkbox
            value={html.formatHTML}
            onChange={value => updateConfig(config => {
              config.html.formatHTML = value
            })}
          >
            {i18n('labelFormatHTML')}
          </Checkbox>
        </div>

        <div>
          <h4 className='px-4 text-sm'>{i18n('headingCleanHTMLAllowlist')}</h4>

          <nav className='px-4'>
            <Button
              className='w-full'
              onClick={() => updateConfig(config => {
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
            {html.cleanHTML.allowlist.map((item, i) => (
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
                        onChange={e => updateConfig(config => {
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
                        onChange={e => updateConfig(config => {
                          config.html.cleanHTML.allowlist[i].attributes = e.target.value
                        })}
                      />
                    </label>
                  </section>
                </div>

                <aside>
                  <RemoveButton
                    onClick={() => updateConfig(config => {
                      config.html.cleanHTML.allowlist.splice(i, 1)
                    })}
                  />
                </aside>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
