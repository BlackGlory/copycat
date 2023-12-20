import { getMenu } from './storage.js'
import { i18n } from '@utils/i18n.js'
import { convertMenuContextToBrowserContextType } from '@utils/menu-context.js'

export async function updateMenu(): Promise<void> {
  const menu = await getMenu()

  await chrome.contextMenus.removeAll()
  for (const { context, items } of menu) {
    for (const item of items) {
      const props: chrome.contextMenus.CreateProperties = {
        id: item.id
      , visible: item.visible
      , type: 'normal'
      , title: i18n(item.id)
      , contexts: [convertMenuContextToBrowserContextType(context)]
      }

      chrome.contextMenus.create(props)
    }
  }
}
