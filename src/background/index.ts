import browser from 'webextension-polyfill'
import { go } from '@blackglory/prelude'
import { ResultType, handlers, Result } from './handlers.js'
import { initStorage, getMenu, getConfig, setConfig, setMenu } from './storage.js'
import { migrate } from './migrate.js'
import { each } from 'extra-promise'
import { offscreen } from './offscreen-client.js'
import { getActiveTab } from 'extra-webextension'
import { IBackgroundAPI } from '@src/contract.js'
import { createServer } from '@delight-rpc/webextension'
import { updateMenu } from './menu.js'

browser.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
  switch (reason) {
    case 'install': {
      // 在安装后初始化.
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

  await injectContentScripts()
})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const result = await handlers[info.menuItemId](info, tab)
  if (result) {
    await handleResult(result)
  }
})

browser.commands.onCommand.addListener(async command => {
  const tab = await getActiveTab()
  const result = await handlers[command]({}, tab)
  if (result) {
    handleResult(result)
  }
})

go(async () => {
  createServer<IBackgroundAPI>({
    getConfig
  , setConfig
  , getMenu
  , setMenu
  })

  await ensureOffscreenDocument()
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

async function handleResult(result: Result): Promise<void> {
  switch (result.type) {
    case ResultType.PlainText: {
      await offscreen.writeTextToClipboard(result.content)
      break
    }
    case ResultType.RichText: {
      await offscreen.writeHTMLToClipboard(result.content)
    }
  }
}
