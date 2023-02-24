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
import classNames from 'classnames'

export function MenuOptions() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [menu, setMenu] = useMenu(client)

  return (
    <div>
      <h2 className='text-lg px-4 py-4 border-y font-bold'>编辑菜单</h2>
      <ul className='my-2 space-y-2'>
        {
          Object
            .entries(menu)
            .filter((entries): entries is [MenuContext, IMenuItem[]] => {
              const [context] = entries
              return inEnum<MenuContext>(context, MenuContext)
            })
            .map(([context, items]) => (
              <li key={context} className='border-b last:border-b-0'>
                <h3 className='text-base px-4 my-2'>
                  {convertMenuContextToBrowserContextType(context)}
                </h3>

                <ul className='my-2'>
                  {items.map((item, i) => (
                    <li
                      key={item.id}
                      className={classNames(
                        'flex px-4 space-x-2 items-center justify-between hover:bg-gray-300'
                      , !item.visible && 'text-gray-400'
                      )}
                    >
                      <div className='flex-1 h-full'>
                        <Checkbox
                          value={item.visible}
                          onClick={value => setMenu(menu => {
                            menu[context][i].visible = value
                          })}
                        >
                          {i18n(item.id)}
                        </Checkbox>
                      </div>

                      <div className='space-x-1'>
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
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))
        }
      </ul>
    </div>
  )
}
