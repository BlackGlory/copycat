import { IConfigStore } from '@src/contract.js'
import { Updater } from 'use-immer'
import { TextInput } from '@components/text-input.jsx'
import { AddButton } from '@components/add-button.jsx'
import { RemoveButton } from '@components/remove-button.jsx'

interface IHTMLOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function HTMLOptions({ config, setConfig }: IHTMLOptionsProps) {
  const allowlist = config.html.cleaner.allowlist

  return (
    <div>
      <h2>Allowlist</h2>
      <nav>
        <AddButton
          onClick={() => {
            config.html.cleaner.allowlist.push({
              elements: '*'
            , attributes: '*'
            })
          }}
        />
      </nav>
      <ul>
        {allowlist.map((item, i) => (
          <li>
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
                <span>Attributes (separator: <code>,</code></span>
                <TextInput
                  value={item.attributes}
                  onChange={e => setConfig(config => {
                    config.html.cleaner.allowlist[i].attributes = e.target.value
                  })}
                />
              </label>
            </section>

            <RemoveButton
              onClick={() => setConfig(config => {
                config.html.cleaner.allowlist.splice(i, 1)
              })}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
