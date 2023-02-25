import { IConfigStore } from '@src/contract.js'
import { Updater } from 'use-immer'
import { TextInput } from '@components/text-input.jsx'
import { Button } from '@components/button.jsx'
import { RemoveButton } from '@components/remove-button.jsx'

interface IHTMLOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function HTMLOptions({ config, setConfig }: IHTMLOptionsProps) {
  const allowlist = config.html.cleaner.allowlist

  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>HTML配置项</h3>
      <div className='py-2'>
        <h4 className='px-4 text-sm'>Alllowlist for HTML (clean) </h4>

        <nav className='px-4'>
          <Button
            className='w-full'
            onClick={() => setConfig(config => {
              config.html.cleaner.allowlist.push({
                elements: '*'
              , attributes: '*'
              })
            })}
          >
            添加项目
          </Button>
        </nav>

        <ul className='mt-1'>
          {allowlist.map((item, i) => (
            <li className='py-2.5 px-4 flex justify-between hover:bg-gray-300'>
              <div>
                <section>
                  <label>
                    <span>Elements (separator: <code>,</code>)</span>
                    <TextInput
                      value={item.elements}
                      onChange={e => setConfig(config => {
                        config.html.cleaner.allowlist[i].elements = e.target.value
                      })}
                    />
                  </label>
                </section>

                <section>
                  <label>
                    <span>Attributes (separator: <code>,</code>)</span>
                    <TextInput
                      value={item.attributes}
                      onChange={e => setConfig(config => {
                        config.html.cleaner.allowlist[i].attributes = e.target.value
                      })}
                    />
                  </label>
                </section>
              </div>

              <aside>
                <RemoveButton
                  onClick={() => setConfig(config => {
                    config.html.cleaner.allowlist.splice(i, 1)
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
