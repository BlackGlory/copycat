import browser from 'webextension-polyfill'
import { commandHandlers, handleCommandResult } from './handlers/index.js'
import { initStorage, getMenu, getConfig, setConfig, setMenu } from './storage.js'
import { migrate } from './migrate.js'
import { each } from 'extra-promise'
import { getActiveTab, waitForLaunch, LaunchReason } from 'extra-webextension'
import { IBackgroundAPI } from '@src/contract.js'
import { createServer } from '@delight-rpc/webextension'
import { updateMenu } from './menu.js'

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const result = await commandHandlers[info.menuItemId](info, tab)
  if (result) {
    await handleCommandResult(result)
  }
})

browser.commands.onCommand.addListener(async command => {
  const tab = await getActiveTab()
  const result = await commandHandlers[command]({}, tab)
  if (result) {
    await handleCommandResult(result)
  }
})

waitForLaunch().then(async details => {
  switch (details.reason) {
    case LaunchReason.Install: {
      // 在安装后初始化.
      await initStorage()
      break
    }
    case LaunchReason.Update: {
      // 在升级后执行迁移.
      if (details.previousVersion) {
        await migrate(details.previousVersion)
      }
      break
    }
  }

  createServer<IBackgroundAPI>({
    getConfig
  , setConfig
  , getMenu
  , setMenu
  })

  await ensureOffscreenDocument()
  await injectContentScripts()
  await updateMenu()
})

async function ensureOffscreenDocument(): Promise<void> {
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
}

/**
 * 将内容脚本尽可能注入到打开的标签页里.
 */
async function injectContentScripts(): Promise<void> {
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
}
