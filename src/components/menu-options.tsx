import { useMemo } from 'react'
import { IBackgroundAPI, IMenuItem, MenuContext } from '@src/contract.js'
import { Checkbox } from '@components/checkbox.jsx'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { convertMenuContextToBrowserContextType } from '@utils/menu-context.js'
import { inEnum } from 'extra-utils'
import { i18n } from '@utils/i18n.js'
import { UpButton } from './up-button.jsx'
import { DownButton } from './down-button.jsx'
import { useMenu } from '@hooks/use-menu.js'

export function MenuOptions() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [menu, setMenu] = useMenu(client)

  return (
    <ul>
      {
        Object
          .entries(menu)
          .filter((entries): entries is [MenuContext, IMenuItem[]] => {
            const [context] = entries
            return inEnum<MenuContext>(context, MenuContext)
          })
          .map(([context, items]) => (
            <li key={context}>
              <h2>{convertMenuContextToBrowserContextType(context)}</h2>
              <ul>
                {items.map((item, i) => (
                  <li key={item.id}>
                    <UpButton
                      onClick={() => setMenu(menu => {
                        const items = menu[context]
                        const previousItem = items[i - 1]
                        if (previousItem) {
                          items[i] = previousItem
                          items[i - 1] = item
                        }
                      })}
                    />
                    <DownButton
                      onClick={() => setMenu(menu => {
                        const items = menu[context]
                        const nextItem = items[i + 1]
                        if (nextItem) {
                          items[i] = nextItem
                          items[i + 1] = item
                        }
                      })}
                    />

                    <Checkbox
                      value={item.visible}
                      onClick={value => setMenu(menu => {
                        menu[context][i].visible = value
                      })}
                    >
                      {i18n(item.id)}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </li>
          ))
      }
    </ul>
  )
}
