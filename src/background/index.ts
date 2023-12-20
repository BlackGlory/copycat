import { commandHandlers, handleCommandResult } from './handlers/index.js'
import { initStorage, getMenu, getConfig, setConfig, setMenu } from './storage.js'
import { migrate } from './migrate.js'
import { each, Deferred } from 'extra-promise'
import { applyPropertyDecorators } from 'extra-proxy'
import { getActiveTab, waitForLaunch, LaunchReason } from 'extra-webextension'
import { IBackgroundAPI } from '@src/contract.js'
import { ImplementationOf } from 'delight-rpc'
import { createServer } from '@delight-rpc/webextension'
import { updateMenu } from './menu.js'

const launched = new Deferred<void>()

const api: ImplementationOf<IBackgroundAPI> = {
  getConfig
, setConfig
, getMenu
, setMenu
}

// 确保尽早启动服务器, 以免拒绝来自客户端的连接, 造成功能失效.
createServer<IBackgroundAPI>(
  applyPropertyDecorators(
    api
  , Object.keys(api) as Array<keyof IBackgroundAPI>
  , (fn: (...args: unknown[]) => unknown) => {
      return async function (...args: unknown[]): Promise<unknown> {
        // 等待初始化/迁移执行完毕
        await launched

        return await fn(...args)
      }
    }
  ) as ImplementationOf<IBackgroundAPI>
)

waitForLaunch().then(async details => {
  console.info(`Launched by ${LaunchReason[details.reason]}`)

  switch (details.reason) {
    case LaunchReason.Install: {
      // 在安装后初始化.
      await initStorage()
      break
    }
    case LaunchReason.Update: {
      // 在升级后执行迁移.
      await migrate(details.previousVersion)
      break
    }
  }

  await ensureOffscreenDocument()
  await updateMenu()

  launched.resolve()

  // 在实际运行中发现, 注入内容脚本的速度可能很慢.
  // 且没有任何选项能够改善注入性能, 因此将该步骤放到最后.
  await injectContentScripts()
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const result = await commandHandlers[info.menuItemId](
    info
  , tab ?? await getActiveTab()
  )

  if (result) {
    await handleCommandResult(result)
  }
})

chrome.commands.onCommand.addListener(async (command, tab) => {
  const result = await commandHandlers[command](
    {}
  , tab ?? await getActiveTab()
  )

  if (result) {
    await handleCommandResult(result)
  }
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
  const manifest = chrome.runtime.getManifest()
  const contentScripts = manifest.content_scripts?.[0].js ?? []
  await each(await chrome.tabs.query({}), async ({ id }) => {
    if (id) {
      try {
        await chrome.scripting.executeScript({
          target: {
            tabId: id
          , allFrames: true
          }
        , files: contentScripts

          // 该选项似乎不起作用, 一些标签页的内容脚本注入速度仍然很慢.
        , injectImmediately: true
        })
      } catch (e) {
        console.warn(e)
      }
    }
  })
}
