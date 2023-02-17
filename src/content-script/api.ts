import browser from 'webextension-polyfill'

export async function getSelectionHTML(
  tabId: number
, frameId: number = 0
): Promise<string> {
  return await browser.tabs.sendMessage(
    tabId
  , { type: 'selection-html' }
  , { frameId }
  )
}

export async function getSelectionText(
  tabId: number
, frameId: number = 0
): Promise<string> {
  return await browser.tabs.sendMessage(
    tabId
  , { type: 'selection-text' }
  , { frameId }
  )
}

export async function getActiveElementContent(
  tabId: number
, frameId: number = 0
): Promise<string> {
  return await browser.tabs.sendMessage(
    tabId
  , { type: 'active-element-content' }
  , { frameId }
  )
}

export async function getDocumentTitle(
  tabId: number
, frameId: number = 0
): Promise<string> {
  return await browser.tabs.sendMessage(
    tabId
  , { type: 'document-title' }
  , { frameId }
  )
}
