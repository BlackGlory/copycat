import { Checkbox } from '@components/checkbox.jsx'
import { getI18nOfMenuContext } from '@utils/menu-context.js'
import { i18n } from '@utils/i18n.js'
import { UpButton } from './up-button.jsx'
import { DownButton } from './down-button.jsx'
import classNames from 'classnames'
import { MenuStoreContext } from '@utils/menu-store.js'
import { useSelector, useUpdater } from 'extra-react-store'

export function MenuOptions() {
  const menu = useSelector(MenuStoreContext, menu => menu)
  const updateMenu = useUpdater(MenuStoreContext)

  return (
    <div>
      <h2 className='text-lg px-4 py-4 border-y font-bold'>{i18n('headingMenu')}</h2>
      <ul className='my-2 space-y-2'>
        {
          menu.map(({ context, items }, menuIndex) => (
            <li key={context} className='border-b last:border-b-0'>
              <h3 className='text-base px-4 my-2'>
                {getI18nOfMenuContext(context)}
              </h3>

              <ul className='my-2'>
                {items.map((item, itemIndex) => (
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
                        onClick={value => updateMenu(menu => {
                          menu[menuIndex].items[itemIndex].visible = value
                        })}
                      >
                        {i18n(item.id)}
                      </Checkbox>
                    </div>

                    <div className='space-x-1'>
                      <UpButton
                        onClick={() => updateMenu(menu => {
                          const { items } = menu[menuIndex]
                          const previousItem = items[itemIndex - 1]
                          if (previousItem) {
                            items[itemIndex] = previousItem
                            items[itemIndex - 1] = item
                          }
                        })}
                      />
                      <DownButton
                        onClick={() => updateMenu(menu => {
                          const { items } = menu[menuIndex]
                          const nextItem = items[itemIndex + 1]
                          if (nextItem) {
                            items[itemIndex] = nextItem
                            items[itemIndex + 1] = item
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
