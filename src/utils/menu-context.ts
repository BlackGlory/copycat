import browser from 'webextension-polyfill'
import { MenuContext } from '@src/contract.js'

export function convertMenuContextToBrowserContextType(
  menuContext: MenuContext
): browser.Menus.ContextType {
  switch (menuContext) {
    case MenuContext.Page: return 'page'
    case MenuContext.Frame: return 'frame'
    case MenuContext.Link: return 'link'
    case MenuContext.Selection: return 'selection'
    case MenuContext.Image: return 'image'
    case MenuContext.Video: return 'video'
    case MenuContext.Audio: return 'audio'
  }
}
