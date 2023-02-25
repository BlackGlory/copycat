import browser from 'webextension-polyfill'
import { MenuContext } from '@src/contract.js'
import { i18n } from '@utils/i18n.js'

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

export function getI18nOfMenuContext(menuContext: MenuContext): string {
  switch (menuContext) {
    case MenuContext.Page: return i18n('menuContextPage')
    case MenuContext.Frame: return i18n('menuContextFrame')
    case MenuContext.Link: return i18n('menuContextLink')
    case MenuContext.Selection: return i18n('menuContextSelection')
    case MenuContext.Image: return i18n('menuContextImage')
    case MenuContext.Video: return i18n('menuContextVideo')
    case MenuContext.Audio: return i18n('menuContextAudio')
  }
}
