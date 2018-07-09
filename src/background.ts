import handlers, { ContextMenusClickHandler, CommandComplicateHandler } from './handlers'
import menus from './menus'
import {
  queryAllInjectableTabs
, writeTextToClipboard
} from './utils'

// Inject after installed / available
browser.runtime.onInstalled.addListener(async () => {
  for (const { id } of await queryAllInjectableTabs()) {
    if (id) {
      browser.tabs.executeScript(id, {
        file: 'browser-polyfill.min.js'
      , allFrames: true
      , matchAboutBlank: true
      , runAt: 'document_end' as browser.extensionTypes.RunAt
      })
      browser.tabs.executeScript(id, {
        file: 'extension-copycat.js'
      , allFrames: true
      , matchAboutBlank: true
      , runAt: 'document_end' as browser.extensionTypes.RunAt
      })
    }
  }
})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = await (handlers[info.menuItemId] as ContextMenusClickHandler)(info, tab)
  if (text) {
    await writeTextToClipboard(text)
  }
})

browser.commands.onCommand.addListener(async command => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true })
  if (tabs.length) {
    const text = await (handlers[command] as CommandComplicateHandler)({}, tabs[0])
    if (text) {
      await writeTextToClipboard(text)
    }
  }
})

;
(async () => {
  // Register menus
  await browser.contextMenus.removeAll()
  for (const [contexts, items] of menus.entries()) {
    for (const item of items) {
      if (!item.type && item.id) {
        item.type = 'normal'
        item.title = browser.i18n.getMessage(item.id)
      }
      item.contexts = contexts
      browser.contextMenus.create(item as any)
    }
  }
})()
