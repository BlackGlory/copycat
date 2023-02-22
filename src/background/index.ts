import browser from 'webextension-polyfill'
import { go } from '@blackglory/prelude'
import { ResultType, handlers } from './handlers.js'
import { menus } from './menus.js'
import { initStorage } from './storage.js'
import { migrate } from './migrate.js'
import { each } from 'extra-promise'
import { offscreenClient } from './offscreen-client.js'
import { getActiveTab } from 'extra-webextension'

browser.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
  switch (reason) {
    case 'install': {
      await initStorage()
      break
    }
    case 'update': {
      // 在升级后执行迁移.
      if (previousVersion) {
        await migrate(previousVersion)
      }
      break
    }
  }

  // 尝试将内容脚本注入所有现有页面.
  const manifest = browser.runtime.getManifest()
  const contentScripts = manifest.content_scripts?.[0].js ?? []
  await each(await browser.tabs.query({}), async ({ id }) => {
    if (id) {
      try {
        await browser.scripting.executeScript({
          target: {
            tabId: id
          , allFrames: true
          }
        , files: contentScripts
        })
      } catch (e) {
        console.warn(e)
      }
    }
  })
})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const result = await handlers[info.menuItemId](info, tab)
  if (result) {
    switch (result.type) {
      case ResultType.PlainText: {
        await offscreenClient.writeTextToClipboard(result.content)
        break
      }
      case ResultType.RichText: {
        await offscreenClient.writeHTMLToClipboard(result.content)
      }
    }
  }
})

browser.commands.onCommand.addListener(async command => {
  const tab = await getActiveTab()

  const result = await handlers[command]({}, tab)
  if (result) {
    switch (result.type) {
      case ResultType.PlainText: {
        await offscreenClient.writeTextToClipboard(result.content)
        break
      }
      case ResultType.RichText: {
        await offscreenClient.writeHTMLToClipboard(result.content)
      }
    }
  }
})

go(async () => {
  // Register menus
  await browser.contextMenus.removeAll()
  for (const [contexts, items] of menus.entries()) {
    for (const item of items) {
      if (!item.type && item.id) {
        item.type = 'normal'
        item.title = browser.i18n.getMessage(item.id)
      }
      item.contexts = contexts
      browser.contextMenus.create(item as browser.Menus.CreateCreatePropertiesType)
    }
  }

  if (!await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html'
    , reasons: [
        chrome.offscreen.Reason.DOM_PARSER
      // , chrome.offscreen.Reason.CLIPBOARD
      ]
    , justification: 'The extension need access to DOM.'
    })
  }
})
