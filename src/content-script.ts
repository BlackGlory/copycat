import { createServer } from '@delight-rpc/webextension'
import { IFrameAPI, SpecialMessage } from '@src/contract.js'
import { isDev } from '@utils/is-dev.js'

if (isDev()) {
  console.info(`[${chrome.runtime.getManifest().name}] The content script is injected`)
}

window.addEventListener('focus', async () => {
  try {
    await chrome.runtime.sendMessage(SpecialMessage.UpdateActiveFrameId)
  } catch (e) {
    if (isDev()) {
      console.error(e)
    }
  }
})

createServer<IFrameAPI>({
  getActiveElementTextContent
, getDocumentTitle
, getSelectionHTML
, getSelectionText
})

function getSelectionHTML(): string | null {
  const userSelection = window.getSelection()
  if (userSelection && userSelection.rangeCount) {
    const range = userSelection.getRangeAt(0)
    const clonedSelection = range.cloneContents()
    const div = document.createElement('div')
    div.appendChild(clonedSelection)
    return div.innerHTML
  } else {
    return null
  }
}

function getSelectionText(): string | null {
  return window.getSelection()?.toString() ?? null
}

function getActiveElementTextContent(): string | null {
  return document.activeElement?.textContent ?? null
}

function getDocumentTitle(): string {
  return document.title
}
